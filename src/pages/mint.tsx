import { ethers } from "ethers";
import { useContext, useEffect } from "react";
import { BalloonPointsContext, PassportContext, QuizPointsContext, SignerContext, UserContext, UserInfoContext } from "../utils/Context";

const Mint = () => {

  const User = useContext(UserContext);
  const Signer = useContext(SignerContext);
  const PassportInstance = useContext(PassportContext);
  const passport = PassportInstance[0];
  const UserInfo = useContext(UserInfoContext);
  const QuizPoints = useContext(QuizPointsContext);
  const BalloonPoints = useContext(BalloonPointsContext);

  useEffect(() => {
    async function getWallet() {
      if (!passport) return;
      const Provider = passport.connectEvm();
      const provider = new ethers.providers.Web3Provider(Provider);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      Signer[1](signer);
    }

    getWallet();
  }, [User]);

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
    <div className="mt-20 flex flex-co; items-center text-center">
      <h3 className="text-3xl text-slate-600">Mint your NFT</h3>
      <p className="mt-5 text-emerald-800">You can mint yourself an NFT, if you have scored more than 20 points on each game.</p>
      <div className="mt-5 flex flex-row">
        <div className="mx-10 rounded border-solid border-x-violet-950 flex flex-col">
          <h4 className="text-slate-500">Balloon Points</h4>
          <p className="text-xl mt-3">{BalloonPoints[0]}</p>
        </div>
        <div className="mx-10 rounded border-solid border-x-violet-950 flex flex-col">
          <h4 className="text-slate-500">Quiz Points</h4>
          <p className="text-xl mt-3">{QuizPoints[0]}</p>
        </div>
      </div>
    </div>
  )
}

export default Mint