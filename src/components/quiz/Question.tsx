import React, { useContext, useEffect, useState } from "react"
import { QuestionProp } from "../../types/type"
import { Button } from "@mui/material"
import QuestionCard from "./QuestionCard"
import Result from "../Result"
import { WebEntryData } from "../../types/auth"
import { UserInfoContext, QuizPointsContext, BalloonPointsContext } from "../../utils/Context"
import { ColorButton } from "../button/ColorButton"

const Question: React.FC<QuestionProp> = ({ quizData, handleDefaultStart }) => {

  const [answered, setAnswered] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState(false);
  const [Disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const UserInfo = useContext(UserInfoContext);
  const QuizPoints = useContext(QuizPointsContext);
  const BalloonPoints = useContext(BalloonPointsContext);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [questionNo, setQuestionNo] = useState(0);

  const QuizQuestions = quizData[questionNo];
  const [Points, setPoints] = useState(0);

  const handleSubmit = () => {
    setAnswered(false);
    setDisabled(false);
    setSelectedAnswer(null);
    if (questionNo === 9) {
      QuizPoints[1](prev => prev + Points)
      setGameOver(true);
    } else if (questionNo === 8) {
      setFinalAnswer(true);
      setQuestionNo(prevNo => prevNo + 1);
    } else {
      setQuestionNo(prevNo => prevNo + 1);
    }
  }

  useEffect(() => {
    if (gameOver) {
      const dataToSend: WebEntryData = {
        userId: UserInfo[0]?.profile?.sub || '',
        data: {
          quiz: {
            points: QuizPoints[0]
          },
          balloon: {
            points: BalloonPoints[0]
          }
        }
      }

      const sendForm = async () => {
        try {
          const response = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
          });
          if (!response.ok) throw new Error('Failed to save data');

        } catch (error) {
          console.error('Error:', error);
        }
      };
      sendForm()
    }
  }, [gameOver])

  return (
    <>
      {!quizData || quizData.length === 0 ?
        <div>
          <p className="text-2xl mt-20 mb-2 text-red-700 font-bold">Sorry for incovenience!</p>
          <p className="mx-2">Please Change the category, difficulty or type. This one does not have any data.</p>
          <Button style={{ marginTop: 16 }} color="primary" variant="contained" href="/quiz" size="large">Select Again</Button>
          <br />
          <Button onClick={handleDefaultStart} style={{ marginTop: 16 }} color="secondary" variant="contained" size="large">Start with default Quiz</Button>
        </div>
        :
        !gameOver ?
          <>
            <QuestionCard setQuizPoints={setPoints} QuizQuestions={QuizQuestions} questionNo={questionNo} setAnswered={setAnswered} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} Disabled={Disabled} setDisabled={setDisabled} />
            <ColorButton onClick={handleSubmit} variant="contained" disabled={!answered}>{finalAnswer ? <>Finish</> : <>Next Question</>}</ColorButton>
          </> :
          <Result Points={Points} />

      }
    </>
  )
}

export default Question
