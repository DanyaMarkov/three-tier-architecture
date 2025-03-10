import $api from '@api/http';
import { TasksResponseType } from './types';

export default class TaskService {
    static async getAll(projectId: number): Promise<TasksResponseType> {
        return await $api.get('/tasks/getAll', {
            params: {
                projectId
            }
        });
    }

    static async delete(id: number): Promise<any> {
        return await $api.delete('/tasks', {
            params: {
                id
            }
        });
    }

    static async createTask({
        name,
        projectId,
        statusId,
        userId
    }: {
        name: string;
        projectId: number;
        statusId: number;
        userId: number;
    }): Promise<TasksResponseType> {
        return await $api.post('/tasks/createTask', { name, projectId, statusId, userId });
    }
}
