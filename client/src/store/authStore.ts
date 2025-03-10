import { Nullable } from '@global/types';
import { RolesEnum } from '@global/variables';
import { create } from 'zustand';

interface CurrentUserType {
    id: number;
    login: string;
    roleId: RolesEnum;
}

interface IAuthStore {
    currentUser: Nullable<CurrentUserType>;
    setCurrentUser: (userData: Nullable<CurrentUserType>) => void;
}

const useAuthStore = create<IAuthStore>((set) => ({
    currentUser: null,
    setCurrentUser: (userData: Nullable<CurrentUserType>) =>
        set((state) => ({
            ...state,
            currentUser: userData
        }))
}));

export default useAuthStore;
