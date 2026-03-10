import { Alert, BodyShort, Button } from "@navikt/ds-react";
import React, { useEffect, useMemo } from "react";

import { buildMfeRemoteEntryUrl, MFERemoteTarget, useMfeVersions } from "./hooks/useMfeVersions";

interface MfeVersionCheckerProps {
    /** List of MFE federation names to check */
    federationNames: string[];
    /** Deploy environment (e.g., 'feature', 'main', 'prod') */
    deployEnv?: string;
    /** Poll interval in milliseconds (default: 60000) */
    pollIntervalMs?: number;
}

/**
 * Component that only renders when a newer MFE version is available.
 */
export default function MfeVersionChecker({ federationNames, deployEnv, pollIntervalMs }: MfeVersionCheckerProps) {
    const targets: MFERemoteTarget[] = useMemo(
        () =>
            federationNames.map((name) => ({
                name,
                remoteEntryUrl: buildMfeRemoteEntryUrl(name, deployEnv),
            })),
        [federationNames, deployEnv]
    );

    const { data: versionStatuses, isLoading, error } = useMfeVersions(targets, { pollIntervalMs });

    useEffect(() => {
        console.log(
            "[MfeVersionChecker] Sjekker MFE-versjoner for",
            targets.map((t) => t.name).join(", "),
            deployEnv,
            pollIntervalMs
        );
        if (!versionStatuses) {
            return;
        }

        const updates = versionStatuses.filter((status) => status.hasUpdate);
        if (updates.length > 0) {
            console.info("[MfeVersionChecker] Nye versjoner tilgjengelig", updates);
        }
    }, [versionStatuses]);

    if (error) {
        console.error("[MfeVersionChecker] Feil ved sjekk av MFE-versjoner", error);
    }

    if (isLoading) {
        return null;
    }

    const hasAnyUpdate = versionStatuses?.some((status) => status.hasUpdate) ?? false;

    if (!hasAnyUpdate) {
        return null;
    }

    return (
        <div
            style={{
                position: "fixed",
                bottom: "1rem",
                right: "1rem",
                zIndex: 9999,
                maxWidth: "320px",
            }}
        >
            <Alert variant="warning" size="small">
                <BodyShort size="small" style={{ marginBottom: "0.75rem" }}>
                    Ny versjon er tilgjengelig. Klikk for å oppdatere.
                </BodyShort>
                <Button size="small" onClick={() => window.location.reload()}>
                    Oppdater siden
                </Button>
            </Alert>
        </div>
    );
}
