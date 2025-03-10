import $api from '@api/http';

export default class TaskStatusesService {
    static async getAll(): Promise<{
        data: {
            id: number;
            name: string;
        }[];
    }> {
        return await $api.get('/taskStatuses/getAll');
    }
}
