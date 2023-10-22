import { useState, useEffect } from "react";
import { CategoryFetcher } from "../utils/QuizApi"
import SelectForm from "../components/quiz/Select";
import { Button } from "@mui/material";

const quiz = () => {
  const [categoryData, setCategoryData] = useState<{ [key: string]: string }>({});
  const categories = [18, 19, 22, 27, 28, 30]

  useEffect(() => {
    const fetchData = async () => {
      const allCategories = await CategoryFetcher();
      const relevantCategories = allCategories.trivia_categories
        .filter((cat: { id: number; }) => categories.includes(cat.id))
        .reduce((acc: { [x: string]: any; }, curr: { id: string | number; name: any; }) => {
          acc[curr.id] = curr.name;
          return acc;
        }, {});

      setCategoryData(relevantCategories);
    };

    fetchData();
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-2xl mt-10 mb-5">Lets Start the Quiz</h2>
      <div className="flex flex-col items-center">
        <SelectForm Label="category" Options={categoryData} />
        <SelectForm Label="difficulty" Options={{ 'easy': 'Easy', 'medium': 'Medium', 'hard': 'Hard' }} />
        <SelectForm Label="type" Options={{ 'multiple': 'Multiple Choice', 'boolean': "True/False" }} />
        <div className="pt-2">
          <Button variant="contained" href="#sdf" size="medium">Start Quiz</Button>
        </div>
      </div>
    </div >
  )
}

export default quiz