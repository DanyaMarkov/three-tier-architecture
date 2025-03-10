import { useEffect, useState } from 'react';
import { ProjectsPageProps } from './types';
import ProjectService from '@api/ProjectService';
import Loader from '@components/Loader';
import RectButton from '@components/Button';
import Popup from '@components/Popup';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ProjectType } from '@api/ProjectService/types';

const ProjectsPage = ({ ownerId }: ProjectsPageProps) => {
    console.log('ownerId = ', ownerId);

    const [allProjects, setAllProjects] = useState<ProjectType[]>([]);
    const [updateProjects, setUpdateProjects] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    useEffect(() => {
        setIsLoading(true);
        ProjectService.getAll()
            .then((response) => setAllProjects(response.data))
            .finally(() => setIsLoading(false));
    }, [updateProjects]);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleChangeProjectName = (event: any) => {
        setProjectName(event.target.value);
    };

    const handleChangeProjectDescription = (event: any) => {
        setProjectDescription(event.target.value);
    };

    const handleAddProject = () => {
        if (!projectName.length || !projectDescription.length) {
            toast.error(`Заполните поля`);
            return;
        }

        ProjectService.createProject({
            name: projectName,
            description: projectDescription
        })
            .then(() => {
                toast.success(`Проект добавлен`);
                setUpdateProjects((prevState) => prevState + 1);
                setIsPopupOpen(false);
            })
            .finally(() => setIsLoading(false));
    };
    const navigate = useNavigate();

    const handleSelectProject = (projectId: number) => () => {
        navigate(`/projects/${projectId}`);
    };

    if (isLoading) return <Loader />;

    return (
        <div className="flex flex-col">
            <div className="flex flex-row gap-4">
                <RectButton onClick={handleOpenPopup}> Добавить проект</RectButton>
            </div>
            Список проектов
            <ul className="grid grid-flow-row grid-cols-4 gap-4">
                {allProjects.map((project) => {
                    return (
                        <li
                            className="p-8 align-middle bg-purple-600 cursor-pointer hover:bg-purple-500"
                            onClick={handleSelectProject(project.id)}>
                            <span className="font-bold">{project.name}</span>
                            <p className="text-wrap">{project.description}</p>
                        </li>
                    );
                })}
            </ul>
            <Popup title="Добавить проект" open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                <label>Название</label>
                <input
                    value={projectName}
                    className="block w-full rounded-lg border border-solid border-[#d1d1d1] bg-gray-50 p-2.5 text-sm text-[#858785] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    onChange={handleChangeProjectName}
                />
                <label>Описание</label>
                <input
                    value={projectDescription}
                    className="block w-full rounded-lg border border-solid border-[#d1d1d1] bg-gray-50 p-2.5 text-sm text-[#858785] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    onChange={handleChangeProjectDescription}
                />
                <RectButton onClick={handleAddProject}>Добавить</RectButton>
            </Popup>
        </div>
    );
};

export default ProjectsPage;
