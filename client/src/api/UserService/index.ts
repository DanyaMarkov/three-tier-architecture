import $api from '@api/http';
import { UsersResponseType, UserToCreateType, UserToDeleteType } from './types';

export default class UserService {
    static async getAll(): Promise<UsersResponseType> {
        return await $api.get('/users/getAll');
    }

    static async createUser({ login, roleId }: UserToCreateType): Promise<UsersResponseType> {
        return await $api.post('/users', { login, roleId });
    }

    static async deleteUser({ userId }: UserToDeleteType): Promise<void> {
        return await $api.delete('/users', { params: { userId } });
    }
}
