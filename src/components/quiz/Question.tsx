import React, { useState, useEffect } from "react"
import { QuestionProp } from "//types/type"
import { Button, ButtonProps, styled } from "@mui/material"
import { purple } from "@mui/material/colors"
import QuestionCard from "./QuestionCard"
import Result from "./Result"

const Question: React.FC<QuestionProp> = ({ quizData }) => {

  const [answered, setAnswered] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState(false);
  const [Disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [questionNo, setQuestionNo] = useState(0);
  const [points, setPoints] = useState(0);

  const QuizQuestions = quizData[questionNo];

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
          <p className="">Please Change the category, difficulty or type. This one doesnt have any data.</p>
        </div>
        :
        !gameOver ?
          <>
            <QuestionCard QuizQuestions={QuizQuestions} questionNo={questionNo} setAnswered={setAnswered} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} Disabled={Disabled} setDisabled={setDisabled} setPoints={setPoints} />
            <ColorButton onClick={handleSubmit} variant="contained" disabled={!answered}>{finalAnswer ? <>Finish</> : <>Next Question</>}</ColorButton>
          </> :
          <Result points={points} />

      }
    </>
  )
}

export default Question
