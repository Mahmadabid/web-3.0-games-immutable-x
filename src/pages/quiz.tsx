import { useState, useEffect } from "react";
import { CategoryFetcher } from "../utils/QuizApi"
import SelectForm from "../components/quiz/Select";
import { Button, ButtonProps, styled } from "@mui/material";
import { CategoryObj } from "../types/type";
import { purple } from "@mui/material/colors";

const quiz = () => {
  const [categoryData, setCategoryData] = useState<CategoryObj>({});
  const categoryIndex = [9, 10, 13, 18, 19, 21]
  const relevantCategories: CategoryObj = {}

  const [categorySelector, setCategorySelector] = useState('');
  const [difficultySelector, setDifficultySelector] = useState('');
  const [typeSelector, setTypeSelector] = useState('');
  const [start, setStart] = useState(false);

  const isValid = categorySelector.length > 0 && difficultySelector.length > 0 && typeSelector.length > 0;

  const handleStart = () => {
    setStart(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      const allCategories = await CategoryFetcher();
      const Categories = allCategories.trivia_categories;

      categoryIndex.forEach(cat => {
        let obj = Categories[cat];
        relevantCategories[obj.id] = obj.name;
      });

      setCategoryData(relevantCategories);
    };

    fetchData();
  }, []);

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: `${theme.palette.getContrastText(purple[500])} !important`,
    backgroundColor: `${purple[500]} !important`,
    '&:hover': {
      backgroundColor: purple[700],
    },
    '&.Mui-disabled': {
      backgroundColor: '#E0E0E0 !important',
      color: '#8C8C8C !important',
    }
  }));

  return (
    <div className="text-center">
      {!start ?
        <>
          <h2 className="text-2xl mt-10 mb-5">Lets Start the Quiz</h2>
          <div className="flex flex-col items-center">
            <SelectForm Label="category" Options={categoryData} value={categorySelector} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategorySelector(e.target.value)} />
            <SelectForm Label="difficulty" Options={{ 'easy': 'Easy', 'medium': 'Medium', 'hard': 'Hard' }} value={difficultySelector} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDifficultySelector(e.target.value)} />
            <SelectForm Label="type" Options={{ 'multiple': 'Multiple Choice', 'boolean': "True/False" }} value={typeSelector} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTypeSelector(e.target.value)} />
            {!isValid? <p className="text-xl text-red-600 mt-2">All Fields are required!</p>: null}
            <div className="pt-2">
              <ColorButton variant="contained" onClick={handleStart} size="large" disabled={!isValid}>Start Quiz</ColorButton>
            </div>
          </div>
        </> : <></>
      }
    </div >
  )
}

export default quiz