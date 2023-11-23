import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { BalloonPointsContext, PassportContext, QuizPointsContext, SignerContext, UserContext, UserInfoContext } from "../utils/Context";
import { WebEntryData } from "../types/auth";
import DialogBox from "../components/market/DialogBox";
import { ColorButton } from "../components/button/ColorButton";
import { Card, CardContent } from "@mui/material";
import Link from "next/link";
import { NFTABI, nftaddress } from "../components/ContractDetails";

const Mint = () => {

  const User = useContext(UserContext);
  const Signer = useContext(SignerContext);
  const PassportInstance = useContext(PassportContext);
  const passport = PassportInstance[0];
  const UserInfo = useContext(UserInfoContext);
  const QuizPoints = useContext(QuizPointsContext);
  const BalloonPoints = useContext(BalloonPointsContext);
  const [open, setOpen] = useState(false);
  const [mint, setMint] = useState(false);
  const [address, setAddress] = useState("");
  const [Hash, setHash] = useState('');
  const [TxnError, setTxnError] = useState('');
  const [TxSuccess, setTxSuccess] = useState(false);
  const [success, setSuccess] = useState(false);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWallet() {
      if (!passport) return;
      const Provider = passport.connectEvm();
      const provider = new ethers.providers.Web3Provider(Provider);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setAddress(await signer.getAddress());
      Signer[1](signer);
      setLoading(false)
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

  const handleMint = async () => {
    try {
      const contractAddress = nftaddress;
      const contractAbi = NFTABI.abi;
  
      const signer = Signer[0] ? Signer[0] : undefined;
  
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  
      const gasLimit = ethers.utils.parseUnits('100', 'gwei');
  
      const transaction = await contract.safeMint(
        address,
        process.env.NEXT_PUBLIC_URI,
        process.env.NEXT_PUBLIC_MINTING_PASSWORD,
        {
          gasLimit: gasLimit,
        }
      );
  
      await transaction.wait();
      setHash(transaction.hash);
      setTxSuccess(true);
    } catch (error) {
      console.error('Minting error:', error);
      setTxnError('Failed to mint NFT');
    }
  };
  
  const handlesMint = async () => {
  try {
    const contractAddress = nftaddress;
    const contract = new ethers.Contract(
      contractAddress,
      ['function safeMint(address to, string uri, string password)'],
      Signer[0] ? Signer[0] : undefined
    );

    const gasLimit = ethers.utils.parseUnits('100', 'gwei');

    const transaction = await contract.safeMint(
      address,
      process.env.NEXT_PUBLIC_URI,
      process.env.NEXT_PUBLIC_MINTING_PASSWORD,
      {
        gasLimit: gasLimit,
      }
    );

    await transaction.wait();
    setHash(transaction.hash);
    setTxSuccess(true);
  } catch (error) {
    console.error('Minting error:', error);
    setTxnError('Failed to mint NFT');
  }
};

  
  useEffect(() => {
    if (!mint) return;
    handleMint();
  }, [mint])

  const handlePoints = () => {
    const dataToSend: WebEntryData = {
      userId: UserInfo[0]?.profile?.sub || '',
      data: {
        quiz: {
          points: QuizPoints[0] - 30
        },
        balloon: {
          points: BalloonPoints[0] - 30
        }
      }
    }

    const sendForm = async () => {
      try {
        const response = await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend)
        });
        if (!response.ok) throw new Error('Failed to save data');

      } catch (error) {
        console.error('Error:', error);
      }
    };
    sendForm()
  }

  useEffect(() => {
    if (!TxSuccess) return;
    handlePoints();
    setSuccess(true)
  }, [TxSuccess])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMint(true);
  };

  return (
    mint ? (
      <div className='flex flex-col break-all items-center justify-center mt-8'>
        <Card
          style={{
            opacity: 0.7,
            backgroundColor: 'rgb(207, 217, 222)',
            padding: '20px',
            maxWidth: '80%',
          }}
        >
          <CardContent>
            {Hash?.length === 0 ? (
              TxnError ? (
                <div className="flex flex-col font-bold items-center justify-center">
                  <p className="text-xl text-red-600">{TxnError}</p>
                  <p className="mt-4 text-sky-800 text-xl">Please Try Again</p>
                </div>
              ) : (
                <div className="flex flex-col font-bold items-center mb-2">
                  <h3 className="text-xl text-slate-600 mb-2">Waiting for Transaction</h3>
                  <svg className="animate-spin w-7 h-7 mt-6 fill-slate-800" viewBox="3 3 18 18">
                    <path className="opacity-20" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
                    </path>
                    <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z">
                    </path>
                  </svg>
                </div>
              )
            ) : (
              <>
                <div className="flex flex-col font-bold items-center mb-2">
                  <p className="text-xl text-slate-600 mb-2">Purchase Was Successful</p>
                  <p className="border-b border-gray-300 pb-2 mr-2 flex-grow">
                    <span className="font-bold flex flex-row items-center">Hash:&nbsp;{Hash}</span>
                  </p>
                </div>
                {success ? (
                  <div className="flex flex-col text-center justify-center mt-2">
                    <p className="text-green-700 text-xl my-2">Success</p>
                    <Link href="/">
                      <ColorButton variant="contained" size="large">View in main page</ColorButton>
                    </Link>
                  </div>
                ) : (
                  <div className="flex text-xl font-bold text-green-800 justify-center mt-2">
                    Finalizing
                    <svg className="animate-spin w-7 h-7 mr-3 fill-slate-800" viewBox="3 3 18 18">
                      <path className="opacity-20" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
                      </path>
                      <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z">
                      </path>
                    </svg>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    ) : (
      <div className="mt-20 flex flex-col items-center text-center">
        <h3 className="text-3xl text-slate-600">Mint your NFT</h3>
        <p className="mt-5 text-emerald-800">You can mint yourself an NFT if you have scored more than 20 points on each game.</p>
        <div className="mt-5 flex flex-row">
          <div className="mx-10 flex flex-col">
            <h4 className="text-slate-500">Balloon Points</h4>
            <p className="text-xl mt-3">{BalloonPoints[0]}</p>
          </div>
          <div className="mx-10 flex flex-col">
            <h4 className="text-slate-500">Quiz Points</h4>
            <p className="text-xl mt-3">{QuizPoints[0]}</p>
          </div>
        </div>
        {QuizPoints[0] >= 30 && BalloonPoints[0] > 30 ? (
          <div>
            <p className="mt-2 text-xl text-green-600">You are qualified to mint</p>
            {Loading ?
              <div className="flex flex-col text-center items-center">
                <p className="text-xl mt-2 text-red-500">Loading! It will take few seconds</p>
                <svg className="animate-spin w-7 h-7 mt-6 fill-slate-800" viewBox="3 3 18 18">
                  <path className="opacity-20" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
                  </path>
                  <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z">
                  </path>
                </svg>
              </div> :
              <button onClick={handleClickOpen} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-2 focus:outline-none">Mint</button>}
        <DialogBox open={open} handleClose={handleClose} />
            <DialogBox open={open} handleClose={handleClose} />
          </div>
        ) : (
          <p className="mt-2 text-xl text-green-600">You need to have more than 30 Points on both games</p>
        )}
      </div>
    )
  );
}

export default Mint;
