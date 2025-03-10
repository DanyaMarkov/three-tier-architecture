import CustomTable from '@components/CustomTable/CustomTable';
import { useEffect, useState } from 'react';
import { tableUsersConfig } from './tableConfig';
import UserService from '@api/UserService';
import { UserType } from '@api/UserService/types';
import RectButton from '@components/Button';

const AdminUsersTable = () => {
    const [allUsers, setAllUsers] = useState<UserType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        UserService.getAll()
            .then((response) => setAllUsers(response.data))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="flex flex-col">
            <div className="flex flex-row gap-4">
                <h1>Все пользователи</h1>
                <RectButton>Добавить пользователя</RectButton>
            </div>
            <CustomTable tableConfig={tableUsersConfig} tableData={allUsers} loading={isLoading} />
        </div>
    );
};

export default AdminUsersTable;
