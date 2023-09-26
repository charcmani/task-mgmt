export interface ErrorResponse {
    error: string,
    details: string,
}

export enum Status {
    Todo = "TODO",
    Inprogress = "INPROGRESS",
    Done = "DONE",
}