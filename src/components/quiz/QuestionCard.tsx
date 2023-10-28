import { Button, ButtonProps, styled } from "@mui/material"
import { QuestionCardProps } from "../../types/type";
import { CSSProperties } from "@mui/material/styles/createMixins";

const QuestionCard = ({ setQuizPoints, QuizQuestions, questionNo, setAnswered, Disabled, setDisabled, selectedAnswer, setSelectedAnswer }: QuestionCardProps) => {

    const handleAnswer = (value: string) => {
        setDisabled(true);
        setAnswered(true);
        setSelectedAnswer(value);
        value === QuizQuestions.correct_answer ? setQuizPoints(points => points + 1) : null;
    };

    const ColorButton = styled(Button)<ButtonProps>(() => ({
        margin: 6,
        '&.Mui-disabled': {
            backgroundColor: 'white !important',
            color: 'black',
            borderColor: 'gray'
        }
    }));

    function decodeHtmlEntity(str: string) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = str;
        return textArea.value;
    }

    return (
        <div className="m-4 items-center text-center">
            <h3 className="m-2 text-xl">Question <span className="text-slate-500 font-bold">{questionNo + 1}/10</span></h3>
            <p className="mt-4">{decodeHtmlEntity(QuizQuestions?.question)}</p>
            <div className="flex flex-col items-center my-4 m-auto">
                {QuizQuestions ? QuizQuestions.answers.map((option: string, key: number) => {
                    let buttonStyle: CSSProperties = { width: '250px' };
                    if (selectedAnswer) {
                        if (selectedAnswer === option) {
                            if (QuizQuestions.correct_answer === option) {
                                buttonStyle = { ...buttonStyle, borderColor: 'green', color: 'green' };
                            } else {
                                buttonStyle = { ...buttonStyle, borderColor: 'red', color: 'red' };
                            }
                        }
                        else if (option === QuizQuestions.correct_answer) {
                            buttonStyle = { ...buttonStyle, borderColor: 'green', color: 'green' };
                        }
                    }
                    return (
                        <ColorButton
                            onClick={() => handleAnswer(option)}
                            key={key}
                            style={buttonStyle}
                            variant="outlined"
                            disabled={Disabled}>
                            {decodeHtmlEntity(option)}
                        </ColorButton>
                    );
                }) : <></>}
            </div>
        </div>
    )
}

export default QuestionCard