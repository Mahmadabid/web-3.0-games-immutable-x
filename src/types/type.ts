import { SelectChangeEvent } from "@mui/material/Select";

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
    setPoints: (value: React.SetStateAction<number>) => void;
    Disabled: boolean;
    setDisabled: (value: React.SetStateAction<boolean>) => void;
    selectedAnswer: string | null
    setSelectedAnswer: (value: React.SetStateAction<string | null>) => void;
}

export type AnswerState = 'correct' | 'incorrect' | 'none';

export type ResultProps = {
    points: number
}