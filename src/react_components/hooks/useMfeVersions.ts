import { useQuery } from "@tanstack/react-query";

const PROD_ENV = "prod";
const STATIC_SEGMENT = "static";
const REMOTE_ENTRY_FILE = "remoteEntry.js";
const DEFAULT_POLL_INTERVAL_MS = 60_000;
const VERSION_HEADER_KEYS = ["x-app-version", "x-version", "etag", "last-modified", "content-length"];

export interface MFERemoteTarget {
    name: string;
    remoteEntryUrl: string;
}

export interface MFEVersionStatus {
    name: string;
    remoteEntryUrl: string;
    currentVersion: string | null;
    latestVersion: string | null;
    hasUpdate: boolean;
    checkedAt: string;
    error: string | null;
}

interface RemoteVersionMetadata {
    version: string | null;
}

interface UseMfeVersionsOptions {
    pollIntervalMs?: number;
    enabled?: boolean;
}

function normalizeDeployEnv(deployEnv?: string): string {
    if (!deployEnv || deployEnv === PROD_ENV) {
        return "";
    }

    return `${deployEnv}/`;
}

export function buildMfeRemoteEntryUrl(federationName: string, deployEnv?: string): string {
    const deployEnvPath = normalizeDeployEnv(deployEnv);
    return `/static/${federationName}/${deployEnvPath}${STATIC_SEGMENT}/${REMOTE_ENTRY_FILE}`;
}

function getVersionFromHeaders(headers: Headers): string | null {
    for (const headerKey of VERSION_HEADER_KEYS) {
        const value = headers.get(headerKey);
        if (value) {
            return value;
        }
    }

    return null;
}

async function fetchRemoteVersionMetadata(url: string, cache: RequestCache): Promise<RemoteVersionMetadata> {
    console.log(`[fetchRemoteVersionMetadata] Henter MFE-versjon fra ${url} med cache=${cache}`);
    const response = await fetch(url, {
        method: "HEAD",
        cache,
    });

    if (!response.ok) {
        throw new Error(`Could not fetch MFE version metadata (${response.status})`);
    }

    return {
        version: getVersionFromHeaders(response.headers),
    };
}

export async function getMfeVersionStatus(target: MFERemoteTarget): Promise<MFEVersionStatus> {
    const checkedAt = new Date().toISOString();

    try {
        const [currentMetadata, latestMetadata] = await Promise.all([
            fetchRemoteVersionMetadata(target.remoteEntryUrl, "default"),
            fetchRemoteVersionMetadata(target.remoteEntryUrl, "no-store"),
        ]);

        return {
            name: target.name,
            remoteEntryUrl: target.remoteEntryUrl,
            currentVersion: currentMetadata.version,
            latestVersion: latestMetadata.version,
            hasUpdate:
                Boolean(currentMetadata.version) &&
                Boolean(latestMetadata.version) &&
                currentMetadata.version !== latestMetadata.version,
            checkedAt,
            error: null,
        };
    } catch (error) {
        return {
            name: target.name,
            remoteEntryUrl: target.remoteEntryUrl,
            currentVersion: null,
            latestVersion: null,
            hasUpdate: false,
            checkedAt,
            error: error instanceof Error ? error.message : "Unknown error while checking MFE version",
        };
    }
}

export function useMfeVersions(targets: MFERemoteTarget[], options?: UseMfeVersionsOptions) {
    const pollIntervalMs = options?.pollIntervalMs ?? DEFAULT_POLL_INTERVAL_MS;
    const enabled = options?.enabled ?? true;

    return useQuery({
        queryKey: ["mfe-versions", targets],
        queryFn: async () => Promise.all(targets.map((target) => getMfeVersionStatus(target))),
        enabled: enabled && targets.length > 0,
        refetchInterval: pollIntervalMs,
        refetchOnWindowFocus: true,
        staleTime: 0,
    });
}
