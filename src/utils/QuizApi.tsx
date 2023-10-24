import { Questions } from "../types/type";

const shuffle = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
};

export const CategoryFetcher = async () => {
    const fetchCategory = await fetch('https://opentdb.com/api_category.php');
    const data = await fetchCategory.json()
    return data
}

export async function fetchQuizData(difficulty: string, types: string, category: number) {
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${types}`);
    const data = await fetchQuestions.json();
    return await data.results.map((question: Questions) => (
        {
            ...question,
            answers: shuffle([...question.incorrect_answers, question.correct_answer])
        }
    ))
}