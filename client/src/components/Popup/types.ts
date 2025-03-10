import { ReactNode } from 'react';

export type PopupProps = {
    open?: boolean;
    title?: string;
    onClose?: () => void;
    children?: ReactNode;
};
