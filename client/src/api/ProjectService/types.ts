export type ProjectType = {
    id: number;
    name: string;
    description: number;
};

export type ProjectsResponseType = {
    data: ProjectType[];
};

export type ProjectToCreateType = {
    name: string;
    description: string;
};

export type ProjectToDeleteType = {
    projectId: number;
};
