import React, { useContext, useState } from "react"
import { QuestionProp } from "//types/type"
import { Button, ButtonProps, styled } from "@mui/material"
import { purple } from "@mui/material/colors"
import QuestionCard from "./QuestionCard"
import Result from "../Result"
import { QuizPointsContext } from "../../utils/Context"

const Question: React.FC<QuestionProp> = ({ quizData, handleDefaultStart }) => {

  const [answered, setAnswered] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState(false);
  const [Disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [questionNo, setQuestionNo] = useState(0);

  const QuizQuestions = quizData[questionNo];
  const QuizPoints = useContext(QuizPointsContext)

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: `${theme.palette.getContrastText(purple[500])} !important`,
    backgroundColor: `${purple[500]} !important`,
    '&:hover': {
      backgroundColor: `${purple[700]} !important`,
    },
    '&.Mui-disabled': {
      backgroundColor: '#E0E0E0 !important',
      color: '#8C8C8C !important',
    }
  }));

  const handleSubmit = () => {
    setAnswered(false);
    setDisabled(false);
    setSelectedAnswer(null);
    if (questionNo === 9) {
      setGameOver(true);
    } else if (questionNo === 8) {
      setFinalAnswer(true);
      setQuestionNo(prevNo => prevNo + 1);
    } else {
      setQuestionNo(prevNo => prevNo + 1);
    }
  }

  return (
    <>
      {!quizData || quizData.length === 0 ?
        <div>
          <p className="text-2xl mt-20 mb-2 text-red-700 font-bold">Sorry for incovenience!</p>
          <p className="mx-2">Please Change the category, difficulty or type. This one doesn't have any data.</p>
          <Button style={{marginTop: 16}} color="primary" variant="contained" href="/quiz" size="large">Select Again</Button>
          <br/>
          <Button onClick={handleDefaultStart} style={{marginTop: 16}} color="secondary" variant="contained" size="large">Start with default Quiz</Button>
        </div>
        :
        !gameOver ?
          <>
            <QuestionCard QuizQuestions={QuizQuestions} questionNo={questionNo} setAnswered={setAnswered} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} Disabled={Disabled} setDisabled={setDisabled} />
            <ColorButton onClick={handleSubmit} variant="contained" disabled={!answered}>{finalAnswer ? <>Finish</> : <>Next Question</>}</ColorButton>
          </> :
          <Result Points={QuizPoints[0]}/>

      }
    </>
  )
}

export default Question
