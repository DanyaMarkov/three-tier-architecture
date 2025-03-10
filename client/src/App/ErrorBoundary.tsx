import { Component, ErrorInfo, ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

type State = {
    hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    backPage = () => {
        window.history.go(-1);
        window.location.reload();
    };

    reloadPage = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex h-screen flex-col items-center justify-center">
                    <h1 className="mb-4 text-3xl font-bold">Упс, непредвиденная ошибка!</h1>
                    <div className="flex flex-row gap-4">
                        <button
                            onClick={this.reloadPage}
                            className="rounded-md bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600 focus:outline-none">
                            Предыдущая страница
                        </button>
                        <button
                            onClick={this.reloadPage}
                            className="rounded-md bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600 focus:outline-none">
                            Обновить страницу
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
