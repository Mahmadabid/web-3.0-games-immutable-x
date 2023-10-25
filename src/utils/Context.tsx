import { Dispatch, SetStateAction, createContext } from 'react'
 
export const QuizPointsContext= createContext<[number, Dispatch<SetStateAction<number>>]>(([0, () => {}]));

export const BalloonPointsContext = createContext<[number, Dispatch<SetStateAction<number>>]>(([0, () => {}]));

export const UserContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>(([false, () => {}]));