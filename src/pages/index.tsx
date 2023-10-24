import { useState } from "react";
import Link from "next/link";
import Cards from '../components/Card'
import Grid from '@mui/material/Unstable_Grid2';
import { Box, useMediaQuery } from "@mui/material";

export default function Home() {
  const [user, setUser] = useState(true);
  const matches = useMediaQuery('(max-width:680px)');
  const Style = { backgroundSize: 'cover', backgroundRepeat: 'no-repeat', display: 'flex', alignItems: 'center', justifyContent: 'center' }

  return (
    <main>
      {user ?
        (
          <div className="text-center">
            <Box sx={{ flexWrap: 'wrap' }}>
              <Grid container justifyContent="center">
                <Grid xs={6} style={matches ? { ...Style, backgroundImage: 'url(/quiz.jpg)', height: 'calc(100vh - 60px)', width: '100%', minWidth: '340px' } : { ...Style, backgroundImage: 'url(/quiz.jpg)', height: 'calc(100vh - 72px)' }} >
                  <Cards content="Answer questions and gain points" heading="Quiz Game" points={10} UrlLink="/quiz" />
                </Grid>
                <Grid xs={6} style={matches ? { ...Style, backgroundImage: 'url(/balloon.jpg)', height: '100vh', width: '100%', minWidth: '340px' } : { ...Style, backgroundImage: 'url(/balloon.jpg)', height: 'calc(100vh - 72px)' }}>
                  <Cards content="Pop balloons and gain points" heading="Balloon Game" points={10} UrlLink="/balloon" />
                </Grid>
              </Grid>
            </Box>
          </div>

        ) :
        (
          <div className="flex flex-col items-center mt-52">
            <p className="text-center text-xl mb-4">Please login to Play.</p>
            <Link href=""><button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Login/Signup</button></Link>
          </div >
        )
      }
    </main >
  )
}
