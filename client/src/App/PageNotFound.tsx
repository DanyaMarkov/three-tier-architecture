const PageNotFound = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center bg-transparent">
            <h1 className="mb-4 text-4xl font-bold text-gray-200">404 - Страница не найдена</h1>
            <p className="mb-6 text-lg text-gray-300">
                К сожалению, запрашиваемая страница не найдена.
            </p>
        </div>
    );
};

export default PageNotFound;
