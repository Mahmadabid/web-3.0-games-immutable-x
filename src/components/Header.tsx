import { useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const Header = () => {
    const [user, setUser] = useState(false);
    const matches = useMediaQuery('(max-width:680px)');

    return (
        <>
            <header className="bg-black p-4 xsm:px-0 text-white shadow-md relative flex items-center">
                <h1 className="flex-grow text-center text-4xl xsm:text-2xl font-bold"><Link href='/' >Web 3.0 Games</Link></h1>
                {user ? (
                    <button className="ml-auto pr-2 inline-flex items-center justify-center h-9 w-9 rounded-full bg-white text-green-500">✔</button>
                ) : (
                    <button className="ml-auto pr-2 text-xl inline-block text-white font-bold">Login</button>
                )}
            </header>
            {matches ?
                <header className= 'bg-gradient-to-r from-gray-700 to-blue-600 text-center font-bold text-xl text-white'>
                    <button onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })} className='mx-8 p-1 focus:outline-none'>Quiz <KeyboardDoubleArrowDownIcon /></button>
                    <button onClick={() => document.getElementById('balloon')?.scrollIntoView({ behavior: 'smooth' })} className='mx-8 p-1 focus:outline-none'>Balloon <KeyboardDoubleArrowDownIcon /></button>
                </header> : null
            }
        </>
    );
}

export default Header;
