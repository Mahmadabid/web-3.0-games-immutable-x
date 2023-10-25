import Layout from '../components/Layout';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QuizPointsContext, BalloonPointsContext, UserContext } from "../utils/Context";
import { useState } from 'react';

function App({ Component, pageProps }: AppProps) {

    const Users = useState(true);
    const quizPoints = useState(0);
    const balloonPoints = useState(0);

    return (
        <Layout>
            <QuizPointsContext.Provider value={quizPoints}>
                <BalloonPointsContext.Provider value={balloonPoints}>
                    <UserContext.Provider value={Users}>
                        <Component {...pageProps} />
                    </UserContext.Provider>
                </BalloonPointsContext.Provider>
            </QuizPointsContext.Provider>
        </Layout>
    );
}

export default App;
