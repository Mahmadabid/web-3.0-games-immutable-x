import { useMediaQuery } from '@mui/material';
import Link from 'next/link';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useRouter } from 'next/router';
import { useAuthentication } from '../utils/user/userAuthentication';
import { useContext, useEffect, useState } from 'react';
import { UserContext, UserInfoContext } from '../utils/Context';
import { UserObject } from '../types/auth';

const Header = () => {
    const { logIn, logOut } = useAuthentication();
    const matches = useMediaQuery('(max-width:680px)');
    const router = useRouter();
    const [User, setUser] = useContext(UserContext);
    const [_, setUserInfo] = useContext(UserInfoContext)

    useEffect(() => {
        function handleAuthSuccess(event: MessageEvent) {
            if (event.data.type === 'authSuccess') {
                let attempts = 0;
                const maxAttempts = 6;

                const intervalId = setInterval(() => {
                    const key = `oidc.user:https://auth.immutable.com:${process.env.NEXT_PUBLIC_CLIENT_ID}`;
                    const userData = localStorage.getItem(key);
                    if (userData && userData.length > 0) {
                        try {
                            const parsedData: UserObject = JSON.parse(userData);
                            setUser(true);
                            setUserInfo(parsedData);
                            clearInterval(intervalId);
                        } catch (error) {
                            console.error("Error parsing user data from localStorage:", error);
                        }
                    } else if (attempts >= maxAttempts) {
                        clearInterval(intervalId);
                    }
                    attempts++;
                }, 700);  
            }
        }

        window.addEventListener('message', handleAuthSuccess);

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
