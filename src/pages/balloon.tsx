import { useContext, useEffect, useState } from "react";
import Login from "../components/Login";
import { BalloonPointsContext, QuizPointsContext, UserContext, UserInfoContext } from "../utils/Context";
import BalloonGame from "../components/balloon/BalloonGame";
import { ColorButton } from "../components/button/ColorButton";

const Balloon = () => {

  const User = useContext(UserContext);
  const QuizPoints = useContext(QuizPointsContext);
  const BalloonPoints = useContext(BalloonPointsContext);
  const UserInfo = useContext(UserInfoContext);
  const [start, setStart] = useState(false);

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

  const handleStart = () => {
    setStart(true);
  }

  return (
    <>
      {User[0] ? !start ?
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl mt-14 mb-5 px-2">Lets Start the Balloon Pop</h2>
          <p className="px-2 mb-7 text-slate-500">{BalloonPoints[0]}For each balloon you pop, you get 1 point. Your points will not exceed 10</p>
          <ColorButton onClick={handleStart} variant="contained" size="large">Start</ColorButton>
        </div> : <BalloonGame />
        : <Login />
      }
    </>
  )
}

export default Balloon