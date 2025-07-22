/* document-load.ts|js file - the code snippet is the same for both the languages */
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";

export const traceprovider = new WebTracerProvider();

traceprovider.register({
    // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
    contextManager: new ZoneContextManager(),
});
