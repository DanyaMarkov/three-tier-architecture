import $api from '@api/http';
import { LoginResponseType } from '@components/LoginForm/types';

export default class AuthService {
    static async login(login: string, password: string): Promise<LoginResponseType> {
        return await $api.post('/users/login', { login, password });
    }

    static async registration(login: string, password: string, roleId: number) {
        await $api
            .post('/users/registration', { login, password, roleId })
            .then((data) => localStorage.setItem('currentUserId', data.data.id));
        return true;
    }
}
