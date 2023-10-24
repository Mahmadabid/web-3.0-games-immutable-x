import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
    const [user, setUser] = useState(false);

    return (
        <header className="bg-black p-4 xsm:px-0 text-white shadow-md relative flex items-center">
            <Link className="flex-grow text-center" href="/"><h1 className="text-4xl xsm:text-2xl font-bold">Web 3.0 Games</h1></Link>
            {user ? (
                <button className="ml-auto inline-flex items-center justify-center h-9 w-9 rounded-full bg-white text-green-500">✔</button>
            ) : (
                <button className="ml-auto text-xl inline-block text-white font-bold">Login</button>
            )}
        </header>
    );
}

export default Header;
