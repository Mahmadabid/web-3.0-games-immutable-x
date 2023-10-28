import '../styles/globals.css'
import { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { LogContext, PassportContext, UserContext, QuizPointsContext, BalloonPointsContext } from "../utils/Context";
import { passport } from "@imtbl/sdk";
import { createPassportInstance } from "../utils/user/Passport";

function App({ Component, pageProps }: AppProps) {
    const [User, setUser] = useState(false);
    const [Log, setLog] = useState(false);
    const [quizPoints, setQuizPoints] = useState(0);
    const [balloonPoints, setBalloonPoints] = useState(0);
    const [passport, setPassport] = useState<passport.Passport | null>(null);

    useEffect(() => {
        // const userData = localStorage.getItem(`oidc.user:https://auth.immutable.com:${process.env.NEXT_PUBLIC_CLIENT_ID}`);
        // if (userData) {
        //     setUser(true);
        // }

        function initializePassport() {
            const instance = createPassportInstance();
            setPassport(instance);
        }
        initializePassport();
    }, []);

    return (
        <PassportContext.Provider value={[passport, setPassport]}>
            <UserContext.Provider value={[User, setUser]}>
                <LogContext.Provider value={[Log, setLog]}>
                    <QuizPointsContext.Provider value={[quizPoints, setQuizPoints]}>
                        <BalloonPointsContext.Provider value={[balloonPoints, setBalloonPoints]}>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </BalloonPointsContext.Provider>
                    </QuizPointsContext.Provider>
                </LogContext.Provider>
            </UserContext.Provider>
        </PassportContext.Provider>
    );
}

export default App;
