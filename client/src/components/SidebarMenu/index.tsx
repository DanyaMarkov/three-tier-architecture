import Logo from '@components/Logo';
import { appLinks } from './appLinks';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '@store/authStore';
import { personalLinks } from './personalLinks';
import { RolesEnum } from '@global/variables';
import { adminLinks } from './adminLinks';
import { userLinks } from './userLinks';

const SidebarMenu = () => {
    const location = useLocation();

    const currentUser = useAuthStore((state) => state.currentUser);

    console.log('currentUser', currentUser);

    return (
        <nav className="border-r-6 sticky top-0 z-50 w-full gap-4 border-b-0 border-l-0 border-r-0 border-dotted border-[#272f38] px-4 ">
            <Logo />
            <div className="flex flex-col gap-2">
                <ul className="flex w-full flex-col gap-2">
                    {appLinks.map((link) => {
                        return (
                            <li key={link.href}>
                                <Link
                                    to={link.href}
                                    className={`flex flex-row items-center gap-4 rounded-lg px-6 py-3 text-xl hover:bg-[#132528]
                                ${location.pathname === link.href ? 'bg-[#14272b] text-[#4ccb8e]' : 'text-[#77818b]'}
                                `}>
                                    {link.icon}
                                    {link.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                {currentUser?.id && (
                    <>
                        {/* <h3 className="my-4 pl-2 text-[#77818b]">Управление</h3> */}
                        <ul className="flex flex-col gap-2">
                            {personalLinks.map((link) => {
                                return (
                                    <li key={link.href}>
                                        <Link
                                            to={link.href}
                                            className={`flex flex-row items-center gap-4 rounded-lg px-6 py-3 text-xl  hover:bg-[#132528]
                                ${location.pathname === link.href ? 'bg-[#14272b] text-[#4ccb8e]' : 'text-[#77818b]'}
                                `}>
                                            {link.icon}
                                            {link.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                )}
                {currentUser?.id && currentUser?.roleId === RolesEnum.Admin && (
                    <ul className="flex flex-col gap-2">
                        {adminLinks.map((link) => {
                            return (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        className={`flex flex-row items-center gap-4 rounded-lg px-6 py-3 text-xl hover:bg-[#132528]
                        ${location.pathname === link.href ? 'bg-[#14272b] text-[#4ccb8e]' : 'text-[#77818b]'}
                        `}>
                                        {link.icon}
                                        {link.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
                {currentUser?.id && currentUser?.roleId === RolesEnum.User && (
                    <ul className="flex flex-col gap-2">
                        {userLinks.map((link) => {
                            return (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        className={`flex flex-row items-center gap-4 rounded-lg px-6 py-3 text-xl hover:bg-[#132528]
                        ${location.pathname === link.href ? 'bg-[#14272b] text-[#4ccb8e]' : 'text-[#77818b]'}
                        `}>
                                        {link.icon}
                                        {link.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default SidebarMenu;
