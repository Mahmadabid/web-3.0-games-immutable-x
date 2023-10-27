import '../styles/globals.css'
import { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { defaultUserState, PassportContext, UserContext, QuizPointsContext, BalloonPointsContext } from "../utils/Context";
import { passport } from "@imtbl/sdk";
import { createPassportInstance } from "../utils/user/Passport";

function App({ Component, pageProps }: AppProps) {
    const Users = useState(defaultUserState);
    const quizPoints = useState(0);
    const balloonPoints = useState(0);
    const passportProvider = useState<passport.Passport | null>(null);

    useEffect(() => {
        passportProvider[1](createPassportInstance())
    }, []);

    return (
        <PassportContext.Provider value={passportProvider}>
            <UserContext.Provider value={Users}>
                <QuizPointsContext.Provider value={quizPoints}>
                    <BalloonPointsContext.Provider value={balloonPoints}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </BalloonPointsContext.Provider>
                </QuizPointsContext.Provider>
            </UserContext.Provider>
        </PassportContext.Provider>
    );
}

export default App;
