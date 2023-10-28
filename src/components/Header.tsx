import { useMediaQuery } from '@mui/material';
import Link from 'next/link';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useRouter } from 'next/router';
import { useAuthentication } from '../utils/user/userAuthentication';
import { useContext, useEffect } from 'react';
import { UserContext } from '../utils/Context';

const Header = () => {

    const { logIn, logOut } = useAuthentication();
    const matches = useMediaQuery('(max-width:680px)');
    const router = useRouter();
    const [User, setUser] = useContext(UserContext);

    useEffect(() => {
        function handleAuthSuccess() {
            setUser(true);

        }
    
        window.addEventListener('message', (event) => {
            if (event.data.type === 'authSuccess') {
                handleAuthSuccess();
            }
        });
    
        return () => {
            window.removeEventListener('message', handleAuthSuccess);
        };
    }, []);
    
    
    return (
        <>
            <header className="bg-black p-4 xsm:px-0 text-white shadow-md relative flex items-center">
                <h1 className="flex-grow text-center text-4xl xsm:text-2xl font-bold"><Link href='/' >Web 3.0 Games</Link></h1>
                {User ? (
                    <button onClick={logOut} className="ml-auto pr-2 text-xl inline-block text-white font-bold">Logout</button>
                ) : (
                    <button onClick={logIn} className="ml-auto pr-2 text-xl inline-block text-white font-bold">Login</button>
                )}
            </header>
            {matches && router.pathname === '/' && User ?
                <header className='bg-gradient-to-r from-gray-700 to-blue-600 text-center font-bold text-xl text-white'>
                    <button onClick={() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })} className='mx-8 p-1 focus:outline-none'>Quiz <KeyboardDoubleArrowDownIcon /></button>
                    <button onClick={() => document.getElementById('balloon')?.scrollIntoView({ behavior: 'smooth' })} className='mx-8 p-1 focus:outline-none'>Balloon <KeyboardDoubleArrowDownIcon /></button>
                </header> : null
            }
        </>
    );
}

export default Header;
