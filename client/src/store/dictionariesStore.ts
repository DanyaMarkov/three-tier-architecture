import { Nullable } from '@global/types';
import { create } from 'zustand';

interface TaskStatusType {
    id: number;
    name: string;
}

interface DictionaryStore {
    taskStatuses: Nullable<TaskStatusType[]>;
    setTaskStatuses: (data: Nullable<TaskStatusType[]>) => void;
}

const useDictionaryStore = create<DictionaryStore>((set) => ({
    taskStatuses: null,
    setTaskStatuses: (data: Nullable<TaskStatusType[]>) =>
        set((state) => ({
            ...state,
            taskStatuses: data
        }))
}));

export default useDictionaryStore;
