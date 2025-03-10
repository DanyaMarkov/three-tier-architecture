import { BsFillPeopleFill } from 'react-icons/bs';
import { BsTable } from 'react-icons/bs';
import { PROJECTS_TABLE_HREF, USERS_TABLE_HREF } from './constants';

export const adminLinks = [
    {
        title: 'Пользователи',
        href: USERS_TABLE_HREF,
        icon: <BsFillPeopleFill />
    },
    {
        title: 'Список проектов',
        href: PROJECTS_TABLE_HREF,
        icon: <BsTable />
    }
];
