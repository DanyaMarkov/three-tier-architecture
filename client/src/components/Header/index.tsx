import { useState } from 'react';
import { CgLogIn, CgLogOut } from 'react-icons/cg';

import Popup from '@components/Popup';
import RectButton from '@components/Button';

import useAuthStore from '@store/authStore';
import LoginForm from '@components/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const currentUser = useAuthStore((state) => state.currentUser);
    const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const navigate = useNavigate();

    const login = () => {
        setIsAuthOpen(true);
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        navigate('/');
    };

    return (
        <>
            <header
                className={`flex h-[80px] flex-row items-center justify-end sticky top-0 z-50 border-l-0 border-r-0
                border-t-0 border-dotted border-[#272f38] bg-[#161c24] px-10
                `}>
                {currentUser?.id ? (
                    <div className="flex flex-row items-center gap-3">
                        <span>{currentUser.login}</span>
                        <RectButton onClick={logout}>
                            <CgLogOut />
                            Выйти
                        </RectButton>
                    </div>
                ) : (
                    <RectButton onClick={login}>
                        <CgLogIn />
                        Войти
                    </RectButton>
                )}
            </header>
            <Popup title="Авторизация" open={isAuthOpen} onClose={() => setIsAuthOpen(false)}>
                <LoginForm onClose={() => setIsAuthOpen(false)} />
            </Popup>
        </>
    );
};

export default Header;
