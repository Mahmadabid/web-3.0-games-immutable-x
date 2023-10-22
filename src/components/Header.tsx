const Header = () => {
    const user = true;

    return (
        <header className="bg-blue-500 p-4 xsm:px-0 text-white shadow-md relative flex items-center">
            <h1 className="flex-grow text-center text-4xl xsm:text-2xl font-bold">Web 3.0 Games</h1>

            {user ? (
                <button className="ml-auto inline-flex items-center justify-center h-9 w-9 rounded-full bg-white text-green-500">✔</button>
            ) : (
                <button className="ml-auto text-xl inline-block text-white font-bold">Login</button>
            )}
        </header >
    );
}

export default Header;
