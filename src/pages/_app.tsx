import '../styles/globals.css'
import { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { PassportContext, UserContext, QuizPointsContext, BalloonPointsContext, UserInfoContext, SignerContext } from "../utils/Context";
import { passport } from "@imtbl/sdk";
import { createPassportInstance } from "../utils/user/Passport";
import { UserObject } from '../types/auth';
import { ethers } from 'ethers';

function App({ Component, pageProps }: AppProps) {
    const [User, setUser] = useState(false);
    const [Log, setLog] = useState(false);
    const [Signer, setSigner] = useState<ethers.Signer | null>(null);
    const [quizPoints, setQuizPoints] = useState(0);
    const [balloonPoints, setBalloonPoints] = useState(0);
    const [passport, setPassport] = useState<passport.Passport | null>(null);
    const [UserInfo, setUserInfo] = useState<UserObject | null>(null);

    useEffect(() => {
        function initializePassport() {
            const instance = createPassportInstance();
            setPassport(instance);

            const key = `oidc.user:https://auth.immutable.com:${process.env.NEXT_PUBLIC_CLIENT_ID}`;
            const userData = localStorage.getItem(key);

            if (userData) {
                try {
                    const parsedData: UserObject = JSON.parse(userData);
                    setUserInfo(parsedData);
                    setUser(true);
                } catch (error) {
                    console.error("Error parsing user data from localStorage:", error);
                }
            } else {
                setLog(true)
            }
        }

        initializePassport();
    }, [Log]);

    return (
        <PassportContext.Provider value={[passport, setPassport]}>
            <SignerContext.Provider value={[Signer, setSigner]}>
                <UserContext.Provider value={[User, setUser]}>
                    <UserInfoContext.Provider value={[UserInfo, setUserInfo]}>
                        <QuizPointsContext.Provider value={[quizPoints, setQuizPoints]}>
                            <BalloonPointsContext.Provider value={[balloonPoints, setBalloonPoints]}>
                                <Layout>
                                    <Component {...pageProps} />
                                </Layout>
                            </BalloonPointsContext.Provider>
                        </QuizPointsContext.Provider>
                    </UserInfoContext.Provider>
                </UserContext.Provider>
            </SignerContext.Provider>
        </PassportContext.Provider>
    );
}

export default App;
