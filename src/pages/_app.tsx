import '../styles/globals.css'
import { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { defaultUserState, PassportContext, UserContext, QuizPointsContext, BalloonPointsContext } from "../utils/Context";
import { createPassportInstance } from "../utils/passport/Passport";
import { passport } from "@imtbl/sdk";

function App({ Component, pageProps }: AppProps) {
    const Users = useState(defaultUserState);
    const quizPoints = useState(0);
    const balloonPoints = useState(0);
    const passportInstance = useState<passport.Passport | null>(null);

    useEffect(() => {
        passportInstance[1](createPassportInstance());
    }, []);

    return (
        <Layout>
            <PassportContext.Provider value={passportInstance}>
                <UserContext.Provider value={Users}>
                    <QuizPointsContext.Provider value={quizPoints}>
                        <BalloonPointsContext.Provider value={balloonPoints}>
                            <Component {...pageProps} />
                        </BalloonPointsContext.Provider>
                    </QuizPointsContext.Provider>
                </UserContext.Provider>
            </PassportContext.Provider>
        </Layout>
    );
}

export default App;
