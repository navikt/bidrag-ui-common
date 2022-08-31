export class MetricService {
    static countMetric(name: string, value: string) {
        if (window.countMetric) {
            window.countMetric(name, value);
        }
    }
}
