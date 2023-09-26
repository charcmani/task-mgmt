
export interface MetricResponse {
    status: Metric,
    timeline: TimedMetric[],
}

export interface Metric {
    open_tasks: number | null,
    ongoing_tasks: number | null,
    completed_tasks: number | null,
}

export interface TimedMetric {
    date: string,
    metrics: Metric,
}
