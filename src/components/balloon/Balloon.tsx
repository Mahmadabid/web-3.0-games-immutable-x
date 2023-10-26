import { useContext, useEffect, useState } from "react";
import { BalloonPointsContext } from "../../utils/Context";
import Result from "../Result";
import BalloonIcon from "./BalloonIcon";
import { blue, red, yellow, green, orange } from '@mui/material/colors'
import { BalloonGeneration } from "//types/type";

const Balloon = () => {

    const BalloonPoints = useContext(BalloonPointsContext);
    const [gameOver, setGameOver] = useState(false);
    const [count, setCount] = useState(10);
    const [points, setPoints] = useState(0);
    const [positions, setPositions] = useState<BalloonGeneration[]>([]);
    const [loading, setLoading] = useState(false)

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
        if (gameOver) {
            setLoading(true)
            BalloonPoints[1](prev => prev + points > 10 ? 10 : points);
            setLoading(false)
        }
    }, [gameOver]);

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
            }, 500);
            return () => clearInterval(balloonInterval);
        }
    }, [gameOver]);

    const handleClick = () => {
        setPoints(point => point + 1)
    }

    return (
        <>
            {gameOver ? !loading ?
                <div className="text-center">
                    <Result Points={BalloonPoints[0]} />
                </div> :
                <div className=" mt-40 text-xl text-slate-500">Loading ...</div> 
                :
                <div className="text-center mt-10">
                    <h1 className="text-xl font-bold text-slate-800">Time: <span className="text-slate-600">{count}</span></h1>
                    {positions.map((position: { top: string; left: string; color: string; }, key: number) => (
                        <BalloonIcon onClick={handleClick} key={key} sx={{ fontSize: 150, position: "absolute", top: position.top, left: position.left, color: position.color }} />
                    ))}
                </div>
            }
            </>
    )
}

            export default Balloon