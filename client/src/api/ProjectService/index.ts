import $api from '@api/http';
import { ProjectsResponseType, ProjectToCreateType, ProjectToDeleteType } from './types';

export default class ProjectService {
    static async getAll(): Promise<ProjectsResponseType> {
        return await $api.get('/projects/getAll');
    }

    static async createProject({
        name,
        description
    }: ProjectToCreateType): Promise<ProjectsResponseType> {
        return await $api.post('/projects/createProject', { name, description });
    }

    static async deleteUser({ projectId }: ProjectToDeleteType): Promise<void> {
        return await $api.delete('/users', { params: { projectId } });
    }
}
