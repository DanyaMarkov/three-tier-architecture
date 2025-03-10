import { RolesEnum } from '@global/variables';

export interface LoginFormProps {
    onClose: () => void;
}

export type LoginFormType = {
    login: string;
    password: string;
};

export type LoginResponseType = {
    data: {
        id: number;
        login: string;
        password: string;
        roleId: RolesEnum;
    };
};
