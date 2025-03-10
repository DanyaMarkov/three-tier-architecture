export type UserType = {
    id: number;
    login: string;
    roleId: number;
};

export type UsersResponseType = {
    data: UserType[];
};

export type UserToCreateType = {
    login: string;
    roleId: number;
};

export type UserToDeleteType = {
    userId: number;
};
