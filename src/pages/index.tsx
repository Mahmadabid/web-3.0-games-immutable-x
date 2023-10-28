import { useContext, useEffect } from "react";
import Cards from '../components/Card'
import Grid from '@mui/material/Unstable_Grid2';
import { Box, useMediaQuery } from "@mui/material";
import { BalloonPointsContext, QuizPointsContext, UserContext, UserInfoContext } from "../utils/Context";
import Login from "../components/Login";

export default function Home() {
  const matches = useMediaQuery('(max-width:680px)');
  const Style = { backgroundSize: 'cover', backgroundRepeat: 'no-repeat', display: 'flex', alignItems: 'center', justifyContent: 'center' }
  const QuizPoints = useContext(QuizPointsContext)
  const BalloonPoints = useContext(BalloonPointsContext);
  const User = useContext(UserContext);
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

  return (
    <main>
      {User[0] ?
        (
          <div className="text-center">
            <div className='bg-white absolute left-1/2 transform -translate-x-1/2 rounded p-2 bg-opacity-70 z-50 w-64 mt-4'>
              <h3 className="text-xl font-bold text-slate-700">Welcome!</h3>
              <p>{UserInfo[0]?.profile?.email}</p>
            </div>
            <Box sx={{ flexWrap: 'wrap' }}>
              <Grid container justifyContent="center">
                <Grid id="quiz" xs={6} style={matches ? { ...Style, backgroundImage: 'url(/quiz.jpg)', height: '100vh', width: '100%' } : { ...Style, backgroundImage: 'url(/quiz.jpg)', height: 'calc(100vh - 72px)' }} >
                  <Cards content="Answer questions and gain points" heading="Quiz Game" points={QuizPoints[0]} UrlLink="/quiz" />
                </Grid>
                <Grid id="balloon" xs={6} style={matches ? { ...Style, backgroundImage: 'url(/balloon.jpg)', height: '100vh', width: '100%' } : { ...Style, backgroundImage: 'url(/balloon.jpg)', height: 'calc(100vh - 72px)' }}>
                  <Cards content="Pop balloons and gain points" heading="Balloon Game" points={BalloonPoints[0]} UrlLink="/balloon" />
                </Grid>
              </Grid>
            </Box>
          </div>
        ) :
        (
          <Login />
        )
      }
    </main >
  )
}
