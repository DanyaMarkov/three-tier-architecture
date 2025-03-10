import useAuthStore from '@store/authStore';

const Profile = () => {
    const currentUser = useAuthStore((state) => state.currentUser);

    return (
        <div className="flex flex-col">
            Ваш профиль
            <div>Имя пользователя: {currentUser?.login}</div>
        </div>
    );
};

export default Profile;
