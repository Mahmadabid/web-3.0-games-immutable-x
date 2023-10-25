import { useContext } from "react";
import { UserContext } from "../utils/Context";
import Login from "../components/Login";

const balloon = () => {

  const User = useContext(UserContext);

  return (
    <>
      {User[0] ?
        <div>Hi</div>
        : <Login/>
      }
    </>
  )
}

export default balloon