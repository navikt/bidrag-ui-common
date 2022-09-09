export function queryParams(): Record<string, string> {
    // @ts-ignore
    return new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop: string) => searchParams.get(prop),
    });
}
