import { useState, useEffect, useContext } from "react";
import { CategoryFetcher, defaultQuizData, fetchQuizData } from "../utils/QuizApi"
import SelectForm from "../components/quiz/Select";
import { SelectChangeEvent} from "@mui/material";
import { CategoryObj, Questions } from "../types/type";
import Question from "../components/quiz/Question";
import { BalloonPointsContext, QuizPointsContext, UserContext, UserInfoContext } from "../utils/Context";
import Login from "../components/Login";
import { ColorButton } from "../components/button/ColorButton";

const Quiz = () => {

  const User = useContext(UserContext);

  const [categoryData, setCategoryData] = useState<CategoryObj>({});
  const categoryIndex = [8, 9, 10, 13, 18, 19, 21]
  const relevantCategories: CategoryObj = {}

  const [categorySelector, setCategorySelector] = useState('');
  const [difficultySelector, setDifficultySelector] = useState('');
  const [typeSelector, setTypeSelector] = useState('');
  const [start, setStart] = useState(false);

  const [questionData, setQuestionData] = useState<Questions[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [QuizLoading, setQuizLoading] = useState(true);

  const isValid = categorySelector.length > 0 && difficultySelector.length > 0 && typeSelector.length > 0;

  const QuizPoints = useContext(QuizPointsContext)
  const BalloonPoints = useContext(BalloonPointsContext);
  const UserInfo = useContext(UserInfoContext)

  const fetchData = async () => {
    const url = `/api/data?userId=${UserInfo[0]?.profile?.sub}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.entries && data.entries.length > 0) {
        const { quiz = {}, balloon = {} } = data.entries[0].data || {};
        QuizPoints[1](quiz.points || 0);
        BalloonPoints[1](balloon.points || 0);
      } else {
        QuizPoints[1](0)
        BalloonPoints[1]((0))
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (UserInfo[0]) {
      fetchData();
    }
  }, [UserInfo[0]])

  const handleStart = async () => {
    setStart(true);
    setLoading(true);
    const questions = await fetchQuizData(difficultySelector, typeSelector, parseInt(categorySelector));
    setQuestionData(questions);
    setLoading(false);
  }

  const handleDefaultStart = async () => {
    setStart(true);
    setLoading(true);
    const questions = await defaultQuizData();
    setQuestionData(questions);
    setLoading(false);
  }

  useEffect(() => {
    setQuizLoading(true);
    const fetchData = async () => {
      const allCategories = await CategoryFetcher();
      const Categories = await allCategories.trivia_categories;

      categoryIndex.forEach(cat => {
        let obj = Categories[cat];
        relevantCategories[obj.id] = obj.name;
      });

      setCategoryData(relevantCategories);
      setQuizLoading(false);
    };

    fetchData();

  }, []);

  return (
    <div className="text-center">
      {
        User[0] ?
          !start ?
            <>
              {QuizLoading ? <div className=" mt-40 text-xl text-slate-500">Loading ...</div> : <>
                <h2 className="text-2xl mt-10 mb-5 px-2">Lets Start the Quiz</h2>
                <p className="px-2 mb-7 text-slate-500">For each quiz you answer correct, you get 1 point.</p>
                <div className="flex flex-col items-center text-left">
                  <SelectForm Label="category" Options={categoryData} value={categorySelector} onChange={(e: SelectChangeEvent<string>) => setCategorySelector(e.target.value)} />
                  <SelectForm Label="difficulty" Options={{ 'easy': 'Easy', 'medium': 'Medium', 'hard': 'Hard' }} value={difficultySelector} onChange={(e: SelectChangeEvent<string>) => setDifficultySelector(e.target.value)} />
                  <SelectForm Label="type" Options={{ 'multiple': 'Multiple Choice', 'boolean': "True/False" }} value={typeSelector} onChange={(e: SelectChangeEvent<string>) => setTypeSelector(e.target.value)} />
                  {!isValid ? <p className="text-md text-red-600 my-2">All Fields are required!</p> : null}
                  <div className="pt-2">
                    <ColorButton variant="contained" onClick={handleStart} size="large" disabled={!isValid}>Start Quiz</ColorButton>
                  </div>
                </div>
              </> }
            </> :
            <div>
              {loading ? <div className=" mt-40 text-xl text-slate-500">Loading ...</div> : questionData ? <Question quizData={questionData} handleDefaultStart={handleDefaultStart} /> : null}
            </div>
          : <Login />}
    </div >
  )
}

export default Quiz