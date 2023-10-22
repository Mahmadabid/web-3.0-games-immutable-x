import { useState } from "react";
import Header from "../components/Header";
import Link from "next/link";
import Cards from '../components/Card'
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from "@mui/material";

export default function Home() {
  const [user, setUser] = useState(true);

  return (
    <main>
      <Header />
      {user ?
        (
          <div className="mt-20 exsm:mx-8">
            <Box sx={{ flexWrap: 'wrap' }}>
              <Grid container spacing={12} justifyContent="center">
                <Grid>
                  <Cards content="Answer questions and gain points" heading="Quiz Game" points={10} UrlLink="#test" ImgUrl="quiz.jpg"/>
                </Grid>
                <Grid>
                  <Cards content="Pop balloons and gain points" heading="Balloon Game" points={10} UrlLink="#test" ImgUrl="balloon.jpg"/>
                </Grid>
              </Grid>
            </Box>
          </div>

        ) :
        (
          <div className="flex flex-col items-center mt-52">
            <p className="text-center text-xl mb-4">Please login to Play.</p>
            <Link href="/api/auth/login"><button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Login/Signup</button></Link>
          </div >
        )
      }
    </main >
  )
}
