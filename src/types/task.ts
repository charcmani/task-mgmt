import { Status } from "./common";

export interface TaskResponse {
    id: number,
    status: Status,
    title: string,
    description: string,
    createdAt: Date,
}

export interface GetResponse {
    prev: string | null,
    next: string | null,
    data: TaskResponse[],
}