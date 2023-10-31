import { useContext, useEffect, useState } from "react";
import Result from "../Result";
import BalloonIcon from "./BalloonIcon";
import { blue, red, yellow, green, orange } from '@mui/material/colors'
import { BalloonGeneration} from "../../types/type";
import { WebEntryData } from "../../types/auth";
import { BalloonPointsContext, QuizPointsContext, UserInfoContext } from "../../utils/Context";

const Balloons = () => {

    const [gameOver, setGameOver] = useState(false);
    const [count, setCount] = useState(10);
    const [points, setPoints] = useState(0);
    const [positions, setPositions] = useState<BalloonGeneration[]>([]);
    const [viewResult, setViewResult] = useState(false);
    const [UserInfo] = useContext(UserInfoContext);
    const QuizPoints = useContext(QuizPointsContext);
    const BalloonPoints = useContext(BalloonPointsContext);

    const getRandomPosition = () => {
        const balloonWidthPercentage = 150 / window.innerWidth * 100;
        const balloonHeightPercentage = 150 / window.innerHeight * 100;

        const topMin = 0, topMax = 100 - (120 / window.innerHeight * 100 + balloonHeightPercentage);
        const leftMin = 0, leftMax = 100 - (150 / window.innerWidth * 100 + balloonWidthPercentage);

        const randomTop = Math.random() * (topMax - topMin) + topMin;
        const randomLeft = Math.random() * (leftMax - leftMin) + leftMin;

        const colors = [red[500], blue[500], green[500], orange[500], yellow[500]];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        return {
            top: `calc(${randomTop}% + 40px)`,
            left: `calc(${randomLeft}% - 50px)`,
            color: randomColor
        };
    }

    const changeBalloonPositions = () => {
        const newPositions = [];
        for (let i = 0; i < 5; i++) {
            newPositions.push(getRandomPosition());
        }
        setPositions(newPositions);
    }

    useEffect(() => {
        changeBalloonPositions();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setGameOver(true);
        }, 10000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (count > 0) {
            const interval = setInterval(() => {
                setCount(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(interval);
        }
    }, []);

    useEffect(() => {
        if (!gameOver) {
            const balloonInterval = setInterval(() => {
                changeBalloonPositions();
            }, 300);
            return () => clearInterval(balloonInterval);
        }
        BalloonPoints[1](prev => prev + (points > 10 ? 10 : points));
        setViewResult(true);
    }, [gameOver]);

    useEffect(() => {
        if (gameOver) {
            const dataToSend: WebEntryData = {
                userId: UserInfo?.profile?.sub || '',
                data: {
                    quiz: {
                        points: QuizPoints[0]
                    },
                    balloon: {
                        points: BalloonPoints[0]
                    }
                }
            }

            const sendForm = async () => {
                try {
                    const response = await fetch('/api/data', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(dataToSend)
                    });
                    if (!response.ok) throw new Error('Failed to save data');

                } catch (error) {
                    console.error('Error:', error);
                }
            };
            sendForm()
        }
    }, [viewResult])

    const handleClick = () => {
        setPoints(point => point + 1);
    }

    return (
        <>
            {gameOver ?
                <div className="text-center">
                    <Result Points={points} />
                </div> :
                <div className="text-center mt-10">
                    <h1 className="text-xl font-bold text-slate-800">Time: <span className="text-slate-600">{count}</span></h1>
                    {positions.map((position: BalloonGeneration, key: number) => (
                        <BalloonIcon onClick={handleClick} key={key} sx={{ fontSize: 150, position: "absolute", top: position.top, left: position.left, color: position.color }} />
                    ))}
                </div>
            }
        </>
    )
}

export default Balloons;