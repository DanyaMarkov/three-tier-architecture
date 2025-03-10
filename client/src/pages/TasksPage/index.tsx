import { useEffect, useState } from 'react';
import Loader from '@components/Loader';
import RectButton from '@components/Button';
import Popup from '@components/Popup';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import TaskService from '@api/TaskService';
import useDictionaryStore from '@store/dictionariesStore';
import useAuthStore from '@store/authStore';

const TasksPage = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [updateTasks, setUpdateTasks] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [taskName, setTaskName] = useState('');

    const dictionary = useDictionaryStore();
    const [selectedTaskStatus, setSelectedTaskStatus] = useState(
        dictionary?.taskStatuses?.[0].id || 0
    );

    const currentUser = useAuthStore((state) => state.currentUser);

    const handleSelectChange = (event: any) => {
        setSelectedTaskStatus(event.target.value);
    };

    const navigate = useNavigate();

    const { projectId } = useParams();

    useEffect(() => {
        setIsLoading(true);
        TaskService.getAll(Number(projectId))
            .then((response) => setTasks(response.data.rows))
            .finally(() => setIsLoading(false));
    }, [updateTasks]);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleChangeTaskName = (event: any) => {
        setTaskName(event.target.value);
    };

    const handleAddTask = () => {
        if (!taskName.length) {
            toast.error(`Заполните поля`);
            return;
        }

        TaskService.createTask({
            name: taskName,
            projectId: Number(projectId),
            statusId: selectedTaskStatus,
            userId: currentUser?.id || 1
        })
            .then(() => {
                toast.success(`Задача добавлена`);
                setUpdateTasks((prevState) => prevState + 1);
                setIsPopupOpen(false);
            })
            .finally(() => setIsLoading(false));
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const getStatusByStatusId = (id: number) => {
        const value = dictionary.taskStatuses?.find((status) => status.id === id);
        return value?.name;
    };

    const handleDeleteTask = (taskId: number) => () => {
        TaskService.delete(taskId).then(() => {
            toast.success(`Задача удалена`);
            setUpdateTasks((prevState) => prevState + 1);
        });
    };

    if (isLoading) return <Loader />;

    return (
        <div className="flex flex-col">
            <div className="flex flex-row gap-4">
                <RectButton color="grey" onClick={handleGoBack}>
                    Назад
                </RectButton>
                <RectButton onClick={handleOpenPopup}> Добавить задачу</RectButton>
            </div>
            Список задач
            <ul className="grid grid-flow-row grid-cols-4 gap-4">
                {tasks?.map((task) => {
                    const statusName = getStatusByStatusId(task.statusId);
                    return (
                        <li className="flex flex-col p-8 align-middle bg-green-600 cursor-pointer hover:bg-green-500">
                            <span className="font-bold">{task.name}</span>
                            <span className="font-bold">Статус: {statusName}</span>
                            <button className="bg-red-600" onClick={handleDeleteTask(task.id)}>
                                X
                            </button>
                        </li>
                    );
                })}
                {!tasks?.length && <span>Пусто. Создайте новую задачу!</span>}
            </ul>
            <Popup title="Добавить задачу" open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                <label>Название</label>
                <input
                    value={taskName}
                    className="block w-full rounded-lg border border-solid border-[#d1d1d1] bg-gray-50 p-2.5 text-sm text-[#858785] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    onChange={handleChangeTaskName}
                />
                <select value={selectedTaskStatus} onChange={handleSelectChange}>
                    {dictionary.taskStatuses?.map((taskStatus) => {
                        return <option value={taskStatus.id}>{taskStatus.name}</option>;
                    })}
                </select>

                <RectButton onClick={handleAddTask}>Добавить</RectButton>
            </Popup>
        </div>
    );
};

export default TasksPage;
