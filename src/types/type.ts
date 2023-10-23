export type Categories = {
    id: number,
    name: string
}

export type SelectTypes = {
    Label: string;
    Options: { [key: string]: string };
    onChange: any;
    value: string;
}

export type CategoryObj = {
    [key: number]: string
}

export type Questions = {
    category: string;
    correct_answer: string;
    question: string;
    incorrect_answers: string[];
    difficulty: string;
    type: string;
}