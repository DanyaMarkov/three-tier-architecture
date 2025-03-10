import { RolesEnum } from '@global/variables';
import useAuthStore from '@store/authStore';
import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type ProtectedRouteProps = {
    accessRole: RolesEnum;
    children: ReactNode;
};

const ProtectedRoute = ({ accessRole, children }: ProtectedRouteProps) => {
    const currentUser = useAuthStore((state) => state.currentUser);

    if (currentUser?.roleId !== accessRole) {
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
