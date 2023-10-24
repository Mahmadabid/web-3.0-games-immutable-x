import { Button } from "@mui/material";
import { ResultProps } from "//types/type";
import Confetti from "react-confetti";

const Result: React.FC<ResultProps> = ({points}) => {

    const Percent = (points/10) * 100;
  
    return (
    <div>
        <Confetti />
        <h3 className="text-4xl mt-20">Your Score: <span className="text-slate-500">{points}</span></h3>
        <p className="mt-5">Your percentage: <span className="text-slate-600">{Percent}%</span><br/>{Percent >= 70 ? " Congratulations! 🚀 " : " Sorry! Better luck next time"}</p>
        <Button style={{marginTop: 16}} color="primary" variant="contained" href="/quiz" size="large">Start Again</Button>
    </div>
  )
}

export default Result