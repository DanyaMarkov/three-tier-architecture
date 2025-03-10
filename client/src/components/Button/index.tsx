import { ReactNode } from 'react';

type RectButtonProps = {
    children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const RectButton = ({ children, ...props }: RectButtonProps) => {
    return (
        <button
            {...props}
            className="flex flex-row items-center gap-2 rounded-md border-2 border-gray-400 bg-blue-500 p-2 text-white hover:bg-blue-400">
            {children}
        </button>
    );
};

export default RectButton;
