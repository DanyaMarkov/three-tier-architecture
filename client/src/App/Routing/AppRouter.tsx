import { PROFILE_HREF, PROJECTS_HREF, USERS_TABLE_HREF } from '@components/SidebarMenu/constants';
import AdminUsersTable from '@pages/AllUsersPage';
import React from 'react';

const Home = React.lazy(() => import('@pages/HomePage'));
const Profile = React.lazy(() => import('@pages/ProfilePage'));
const PageNotFound = React.lazy(() => import('../PageNotFound'));

import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { RolesEnum } from '@global/variables';
import ProjectsPage from '@pages/ProjectsPage';
import TasksPage from '@pages/TasksPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path={PROFILE_HREF} element={<Profile />} />

            <Route
                path={USERS_TABLE_HREF}
                element={
                    <ProtectedRoute accessRole={RolesEnum.Admin}>
                        <AdminUsersTable />
                    </ProtectedRoute>
                }
            />
            <Route path={PROJECTS_HREF} element={<ProjectsPage />} />
            <Route path={`${PROJECTS_HREF}/:projectId`} element={<TasksPage />} />

            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default AppRouter;
