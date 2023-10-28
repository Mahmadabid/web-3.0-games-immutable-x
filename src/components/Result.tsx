import { Button } from "@mui/material";
import React from "react";
import Confetti from "react-confetti";
import { ResultProps } from "//types/type";
import { useRouter } from "next/router";
const Result: React.FC<ResultProps> = ({ Points }) => {

  const router = useRouter();
  const Percent = (Points / 10) * 100;

  return (
    <div>
      <Confetti />
      <h3 className="text-4xl mt-20">Your Score: <span className="text-slate-500">{Points}</span></h3>
      <p className="mt-5">Your percentage: <span className="text-slate-600">{Percent}%</span><br />{Percent >= 70 ? " Congratulations! 🚀 " : " Sorry! Better luck next time"}</p>
      <Button style={{ marginTop: 16 }} color="primary" variant="contained" href={router.pathname} size="large">Start Again</Button>
    </div>
  )
}

export default Result