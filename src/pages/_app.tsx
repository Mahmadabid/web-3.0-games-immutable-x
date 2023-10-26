import Layout from '../components/Layout';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QuizPointsContext, BalloonPointsContext, UserContext, PassportContext, defaultUserState } from "../utils/Context";
import { useState } from 'react';

function App({ Component, pageProps }: AppProps) {

    const Users = useState(defaultUserState);
    const quizPoints = useState(0);
    const balloonPoints = useState(0);

    return (
        <Layout>
            <PassportContext.Provider value={[null, () => {}]}>
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
