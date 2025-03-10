import { IoMdClose } from 'react-icons/io';
import { PopupProps } from './types';

const Popup = ({ open = false, title, onClose, children }: PopupProps) => {
    return (
        <div
            role="dialog"
            data-testid="popup"
            className={`fixed inset-0 flex items-center justify-center transition-colors ${open ? 'visible bg-black/20' : 'invisible'}`}
            onClick={onClose}>
            <div
                className={`min-w-96 max-w-md rounded-lg bg-white p-6 shadow 
          ${open ? 'scale-100 opacity-100' : 'opacitiy-0 scale-110'}`}
                onClick={(e) => e.stopPropagation()}>
                <div>
                    <span className="absolute left-4 top-3 text-black">{title}</span>
                    <button
                        type="button"
                        className="absolute right-2 top-2 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onClose}>
                        <IoMdClose size={22} />
                    </button>
                </div>
                <div className="mt-8 w-full text-black ">{children}</div>
            </div>
        </div>
    );
};

export default Popup;
