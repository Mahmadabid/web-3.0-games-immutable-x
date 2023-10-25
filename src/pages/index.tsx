import { useContext } from "react";
import Link from "next/link";
import Cards from '../components/Card'
import Grid from '@mui/material/Unstable_Grid2';
import { Box, useMediaQuery } from "@mui/material";
import { BalloonPointsContext, QuizPointsContext, UserContext } from "../utils/Context";
import Login from "../components/Login";

export default function Home() {
  const matches = useMediaQuery('(max-width:680px)');
  const Style = { backgroundSize: 'cover', backgroundRepeat: 'no-repeat', display: 'flex', alignItems: 'center', justifyContent: 'center' }
  const QuizPoints = useContext(QuizPointsContext)
  const BalloonPoints = useContext(BalloonPointsContext);
  const User = useContext(UserContext);

  return (
    <main>
      {User[0] ?
        (
          <div className="text-center">
            <Box sx={{ flexWrap: 'wrap' }}>
              <Grid container justifyContent="center">
                <Grid id="quiz" xs={6} style={matches ? { ...Style, backgroundImage: 'url(/quiz.jpg)', height: '100vh', width: '100%', minWidth: '340px' } : { ...Style, backgroundImage: 'url(/quiz.jpg)', height: 'calc(100vh - 72px)' }} >
                  <Cards content="Answer questions and gain points" heading="Quiz Game" points={QuizPoints[0]} UrlLink="/quiz" />
                </Grid>
                <Grid id="balloon" xs={6} style={matches ? { ...Style, backgroundImage: 'url(/balloon.jpg)', height: '100vh', width: '100%', minWidth: '340px' } : { ...Style, backgroundImage: 'url(/balloon.jpg)', height: 'calc(100vh - 72px)' }}>
                  <Cards content="Pop balloons and gain points" heading="Balloon Game" points={BalloonPoints[0]} UrlLink="/balloon" />
                </Grid>
              </Grid>
            </Box>
          </div>

        ) :
        (
          <Login/>
        )
      }
    </main >
  )
}
