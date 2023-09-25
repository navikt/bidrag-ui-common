interface BaseMetricRequest {
    name: string;
    type: "gauge" | "counter";
    description: string;
    labels: Record<string, string>;
    value?: number;
}

interface CountMetricRequest extends BaseMetricRequest {
    type: "counter";
    value: never;
}

interface GaugetMetricRequest extends BaseMetricRequest {
    type: "gauge";
    value: number;
}
export type MetricRequest = CountMetricRequest | GaugetMetricRequest;
