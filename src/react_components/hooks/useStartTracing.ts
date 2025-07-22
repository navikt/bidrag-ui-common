import "./trace";

import { ROOT_CONTEXT, trace } from "@opentelemetry/api";
import { useEffect } from "react";
export const tracename = "bidrag-ui-session";

const tracer = trace.getTracer(tracename);

export default function useStartTracing() {
    useEffect(() => {
        // Start a root span for the session
        const sessionSpan = tracer.startSpan("ui-session-root");
        // Set as active context for the session
        const sessionContext = trace.setSpan(ROOT_CONTEXT, sessionSpan);

        // Optionally store in window/global for access in hooks
        // @ts-ignore
        window.__otelSessionContext = sessionContext;

        // @ts-ignore
        window.__otelSessionSpan = sessionSpan;

        // End span on unload
        return () => {
            sessionSpan.end();
        };
    }, []);
}
