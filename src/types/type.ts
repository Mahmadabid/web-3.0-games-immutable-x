import { SelectChangeEvent } from "@mui/material/Select";
import { Dispatch, SetStateAction } from "react";

export type Categories = {
    id: number,
    name: string
}

export type SelectTypes = {
    Label: string;
    Options: { [key: string]: string };
    onChange: (event: SelectChangeEvent<string>) => void;
    value: string;
}

export type CategoryObj = {
    [key: number]: string
}

export type QuestionProp = {
    quizData: Questions[];
    handleDefaultStart: () => Promise<void>;
}

export type Questions = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answers: string[]
}

export type QuestionCardProps = {
    QuizQuestions: Questions;
    questionNo: number;
    setAnswered: (value: React.SetStateAction<boolean>) => void;
    Disabled: boolean;
    setDisabled: (value: React.SetStateAction<boolean>) => void;
    selectedAnswer: string | null;
    setSelectedAnswer: (value: React.SetStateAction<string | null>) => void;
    setQuizPoints: (value: React.SetStateAction<number>) => void;
}

export type AnswerState = 'correct' | 'incorrect' | 'none';

export enum ResultLabel {
    balloon= 'balloon',
    quiz = 'quiz'
}

export type ResultProps = {
    Points: number;
}

export type BalloonGeneration = {
    top: string;
    left: string;
    color: string;
}