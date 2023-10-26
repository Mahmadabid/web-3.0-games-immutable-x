import { passport } from '@imtbl/sdk';
import { Dispatch, SetStateAction, createContext } from 'react'
 
export const defaultUserState = false;

export const QuizPointsContext= createContext<[number, Dispatch<SetStateAction<number>>]>(([0, () => {}]));

export const BalloonPointsContext = createContext<[number, Dispatch<SetStateAction<number>>]>(([0, () => {}]));

export const UserContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>(([defaultUserState, () => {}]));

// export const PassportContext = createContext<any>([null, () => {}])
export const PassportContext = createContext<[passport.Passport | null, Dispatch<SetStateAction<passport.Passport | null>>]>([null, () => {}])
