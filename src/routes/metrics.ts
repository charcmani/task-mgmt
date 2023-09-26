import express, { Request, Response } from 'express';
import * as MetricType from '../types/metric';
import * as Common from '../types/common'
import {Task} from '../models/Task';
import { seq } from '../db';
import { GroupedCountResultItem } from 'sequelize';
import { monthsByName } from '../constants';

export const router = express.Router();

router.get('/', async (_req: Request, res: Response<MetricType.MetricResponse | Common.ErrorResponse>) => {
    try {
        const statusCounts: GroupedCountResultItem[] = await Task.count({group: ['status'],});
        const timelineCounts: GroupedCountResultItem[] = await Task.count({
            group: [seq.fn('date_trunc', 'month', seq.col('createdAt')), 'status'],
        });
        const timelineResponse = transformToTimelineResponse(mergeTimelineCounts(timelineCounts));
        const status = transformToStatusCountResponse(statusCounts);
        return res.status(200).json({ status, timeline: timelineResponse });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve metrics' , details : JSON.stringify(error) });
    }
});

function toResponseStatus(status: string): string {
    switch (status) {
        case "TODO":
            return "open_tasks";
        case "INPROGRESS":
            return "ongoing_tasks";
        case "DONE":
            return "completed_tasks";
        default:
            return status;
    }
}

function transformToStatusCountResponse(statusCounts: any): MetricType.Metric {
    const inprogressTasks = statusCounts.find((status : any) => status.status === Common.Status.Inprogress)?.count || null;
    const openTasks = statusCounts.find((status : any) => status.status === Common.Status.Todo)?.count || null;
    const completedTasks = statusCounts.find((status : any) => status.status === Common.Status.Done)?.count || null;
    const statusResponse: MetricType.Metric = {
        ongoing_tasks: inprogressTasks,
        open_tasks: openTasks,
        completed_tasks: completedTasks,
    };
    return statusResponse;
}

function transformToTimelineResponse(timeline: any) {
    const timelineResponse: MetricType.TimedMetric[] = [];
    const keys = Object.keys(timeline);
    keys.forEach((key) => {
        const value = <MetricType.Metric>timeline[key];
        const timelineEntry: MetricType.TimedMetric = {
            date: key,
            metrics: value
        }

        timelineResponse.push(timelineEntry);
    })
    return timelineResponse;
}

function mergeTimelineCounts(timelines:GroupedCountResultItem[]) {
    const timeline = <any>timelines;
    const perMonthData: any = {};
    timeline.forEach((object : any) => {
        const month = monthsByName[object['date_trunc'].getMonth()];
        const year = object.date_trunc.getFullYear().toString();
        const monthYear: string = month + ' ' + year;
        if (!perMonthData[monthYear]) perMonthData[monthYear] = {};
        perMonthData[monthYear][toResponseStatus(object.status)] = object.count;
    });
    return perMonthData;

}

// module.exports = router;
