import { useContext,  useState } from "react";
import Login from "../components/Login";
import { UserContext } from "../utils/Context";
import { Button, ButtonProps, styled } from "@mui/material";
import { purple } from "@mui/material/colors";

const Balloon = () => {

  const User = useContext(UserContext);
  const [start, setStart] = useState(false);

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: `${theme.palette.getContrastText(purple[500])} !important`,
    backgroundColor: `${purple[500]} !important`,
    '&:hover': {
      backgroundColor: `${purple[700]} !important`,
    },
  }));

  const handleStart = () => {
    setStart(true);
  }

  return (
    <>
      {User[0] ? !start ?
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl mt-14 mb-5 px-2">Lets Start the Balloon Pop</h2>
          <p className="px-2 mb-7 text-slate-500">For each balloon you pop, you get 1 point. Your points will not exceed 10</p>
          <ColorButton onClick={handleStart} variant="contained" size="large">Start</ColorButton>
        </div> : <Balloon />
        : <Login />
      }
    </>
  )
}

export default Balloon