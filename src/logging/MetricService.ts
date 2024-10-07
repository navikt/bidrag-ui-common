import { MetricRequest } from "types";

export class MetricService {
    static countMetric(req: { name: string; description: string; labels: Record<string, string> }) {
        return fetch("/metrics", {
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify({ ...req, type: "counter" } as MetricRequest),
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => res.json())
            .catch(console.log);
    }

    static gaugeMetric(req: { name: string; description: string; value: number; labels: Record<string, string> }) {
        return fetch("/metrics", {
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify({ ...req, type: "gauge" } as MetricRequest),
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((res) => res.json())
            .catch(console.log);
    }
}
