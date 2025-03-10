export type TaskType = {
    id: number;
    name: string;
    projectId: number;
    userId: number;
    statusId: number;
};

export type TasksResponseType = {
    data: TaskType[];
};
