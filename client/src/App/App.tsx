import { Suspense, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import AppRouter from './Routing/AppRouter';
import Loader from '@components/Loader';
import Header from '@components/Header';
import SidebarMenu from '@components/SidebarMenu';
import useAuthStore from '@store/authStore';
import { Toaster } from 'react-hot-toast';
import useDictionaryStore from '@store/dictionariesStore';
import TaskStatusesService from '@api/TaskStatusesService';

function App() {
    const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
    const setTaskStatuses = useDictionaryStore((state) => state.setTaskStatuses);

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) setCurrentUser(JSON.parse(currentUser));
    }, [setCurrentUser]);

    useEffect(() => {
        TaskStatusesService.getAll().then((response) => setTaskStatuses(response.data));
    }, [setCurrentUser]);

    return (
        <ErrorBoundary>
            <Toaster />
            <div className="grid h-screen grid-cols-[320px_auto] grid-rows-[80px_auto] gap-0">
                <div className="row-span-2">
                    <SidebarMenu />
                </div>
                <Header />
                <main className="col-start-2 row-start-2 border-b-0 border-r-0 border-t-0 border-dotted border-[#272f38] p-6">
                    <Suspense fallback={<Loader />}>
                        <AppRouter />
                    </Suspense>
                </main>
            </div>
        </ErrorBoundary>
    );
}

export default App;
