import { useForm } from 'react-hook-form';
import AuthService from '@api/AuthService';
import { LoginFormProps, LoginFormType, LoginResponseType } from './types';
import { validateTrim } from '@global/utils';
import RectButton from '@components/Button';
import { useState } from 'react';
import { Nullable } from '@global/types';
import toast from 'react-hot-toast';
import useAuthStore from '@store/authStore';
import { MdErrorOutline } from 'react-icons/md';
import { loginFormDefaultValues } from './variables';
import { RolesEnum } from '@global/variables';

const LoginForm = ({ onClose }: LoginFormProps) => {
    const [authError, setAuthError] = useState<Nullable<string>>(null);

    const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<typeof loginFormDefaultValues>();

    const submitAuthorization = (formData: LoginFormType) => {
        AuthService.login(formData.login, formData.password)
            .then((response: LoginResponseType) => {
                console.log('Login', response);
                reset({ ...loginFormDefaultValues });

                const userData = response.data;
                toast.success(`Добро пожаловать, ${userData.login}`);

                setCurrentUser({ id: userData.id, login: userData.login, roleId: userData.roleId });

                localStorage.setItem(
                    'currentUser',
                    JSON.stringify({
                        id: userData.id,
                        login: userData.login,
                        roleId: userData.roleId
                    })
                );
                onClose();
            })
            .catch((error) => {
                setAuthError(error.message);
                setTimeout(() => {
                    setAuthError(null);
                }, 2000);
            });
    };

    const submitRegistration = (formData: LoginFormType) => {
        AuthService.registration(formData.login, formData.password, RolesEnum.User)
            .then(() => {
                reset({ ...loginFormDefaultValues });
                toast.success('Успешная регистрация');
                onClose();
            })
            .catch((error) => {
                setAuthError(error.message);
                setTimeout(() => {
                    setAuthError(null);
                }, 2000);
            });
    };

    return (
        <form
            onSubmit={handleSubmit(submitAuthorization)}
            className="mx-auto my-0 grid w-full content-center gap-3">
            <div className="flex flex-row gap-2">
                <input
                    type="text"
                    placeholder="Логин"
                    className="block w-full rounded-lg border border-solid border-[#d1d1d1] bg-gray-50 p-2.5 text-sm text-[#858785] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    {...register('login', {
                        required: 'Обязательное поле',
                        validate: validateTrim
                    })}
                />
                {errors.login?.message && (
                    <MdErrorOutline size={20} color="#dc2626" title="Обязательное поле" />
                )}
            </div>
            <div className="flex flex-row gap-2">
                <input
                    type="password"
                    placeholder="Пароль"
                    className="block w-full rounded-lg border border-solid border-[#d1d1d1] bg-gray-50 p-2.5 text-sm text-[#000000] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    {...register('password', {
                        required: 'Обязательное поле',
                        validate: validateTrim
                    })}
                />
                {errors.password?.message && (
                    <MdErrorOutline size={20} color="#dc2626" title="Обязательное поле" />
                )}
            </div>

            {authError && <span className="text-red-700"> {authError}</span>}

            <div className="flex w-full flex-col gap-4 py-4">
                <RectButton type="submit" className="btn-primary">
                    Войти
                </RectButton>
                <RectButton onClick={handleSubmit(submitRegistration)} className="btn-primary">
                    Зарегистрироваться
                </RectButton>
            </div>
        </form>
    );
};

export default LoginForm;
