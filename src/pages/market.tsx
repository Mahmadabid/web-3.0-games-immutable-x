import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { BalloonPointsContext, PassportContext, QuizPointsContext, SignerContext, UserContext, UserInfoContext } from "../utils/Context";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React from "react";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BalloonIcon from "../components/balloon/BalloonIcon";
import ProductCard from "../components/market/ProductCard";
import { Box, Button, Card, CardContent, Grid, Link, styled } from "@mui/material";
import { purple } from "@mui/material/colors";
import { BalloonPointsContractAddress, QuizPointsContractAddress } from "../components/ContractDetails";
import { WebEntryData } from "../types/auth";

const Market = () => {
    const User = useContext(UserContext);
    const Signer = useContext(SignerContext);
    const PassportInstance = useContext(PassportContext);
    const passport = PassportInstance[0];
    const UserInfo = useContext(UserInfoContext);
    const QuizPoints = useContext(QuizPointsContext);
    const BalloonPoints = useContext(BalloonPointsContext);
    const [value, setValue] = useState('quiz');
    const [QuizBuy, setQuizBuy] = useState(false);
    const [BalloonBuy, setBalloonBuy] = useState(false);
    const [Hash, setHash] = useState('');
    const [TxnError, setTxnError] = useState('');
    const [TxSuccess, setTxSuccess] = useState(false);
    const [success, setSuccess] = useState(false);
    const [amount, setamount] = useState(0);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        async function getWallet() {
            if (!passport) return;
            const Provider = passport.connectEvm();
            const provider = new ethers.providers.Web3Provider(Provider);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            Signer[1](signer);
            setLoading(false);
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
                QuizPoints[1](0);
                BalloonPoints[1](0);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        if (UserInfo[0]) {
            fetchData();
        }
    }, [UserInfo[0]]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    async function sendQuizTransaction() {
        if (!Signer[0]) {
            console.error("Signer is not set!");
            return;
        }

        let tokens = amount;

        const balance = await Signer[0].getBalance();
        const balanceValue = ethers.utils.formatEther(balance);

        if (parseFloat(balanceValue) === 0.0 || parseFloat(balanceValue) < tokens + 0.01) {
            setTxnError('Your Wallet has less tokens then required. Recharge your wallet to make a transaction.')
            return;
        }

        try {
            const imx = ethers.utils.parseEther(tokens.toString());
            const hash = await Signer[0].sendTransaction({
                to: QuizPointsContractAddress,
                value: imx,
            })
            const receipt = await hash.wait();
            setHash(receipt.transactionHash);
            QuizPoints[1](prev => prev + tokens === 0.02 ? 1 : tokens === 0.035 ? 2 : tokens === 0.05 ? 3 : 0)
            setTxSuccess(true);
            return receipt.transactionHash;
        } catch (error) {
            setTxnError(error.message)
        }
    }

    async function sendBalloonTransaction() {
        if (!Signer[0]) {
            console.error("Signer is not set!");
            return;
        }

        let tokens = amount;

        const balance = await Signer[0].getBalance();
        const balanceValue = ethers.utils.formatEther(balance);

        if (parseFloat(balanceValue) === 0.0 || parseFloat(balanceValue) < tokens + 0.001) {
            setTxnError('Your Wallet has less tokens then required. Recharge your wallet to make a transaction.')
            return;
        }

        try {
            const imx = ethers.utils.parseEther(tokens.toString());
            const hash = await Signer[0].sendTransaction({
                to: BalloonPointsContractAddress,
                value: imx,
            })
            const receipt = await hash.wait();
            setHash(receipt.transactionHash);
            QuizPoints[1](prev => prev + tokens === 0.02 ? 1 : tokens === 0.035 ? 2 : tokens === 0.05 ? 3 : 0)
            setTxSuccess(true);
            return receipt.transactionHash;
        } catch (error) {
            setTxnError(error.message)
        }
    }

    useEffect(() => {
        if (!QuizBuy) return;
        sendQuizTransaction();
    }, [QuizBuy])

    useEffect(() => {
        if (!BalloonBuy) return;
        sendBalloonTransaction();
    }, [BalloonBuy])

    useEffect(() => {
        if (TxSuccess) {
            const dataToSend: WebEntryData = {
                userId: UserInfo[0]?.profile?.sub || '',
                data: {
                    quiz: {
                        points: QuizPoints[0]
                    },
                    balloon: {
                        points: BalloonPoints[0]
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
            setSuccess(true)
        }
    }, [TxSuccess])

    const quizProducts = [
        { heading: "1 Point", price: 0.02, image: "/quiz1.png" },
        { heading: "2 Points", price: 0.035, image: "/quiz2.png" },
        { heading: "3 Points", price: 0.05, image: "/quiz3.png" },
    ];

    const balloonProducts = [
        { heading: "1 Point", price: 0.02, image: "/balloon1.png" },
        { heading: "2 Points", price: 0.035, image: "/balloon2.png" },
        { heading: "3 Points", price: 0.05, image: "/balloon3.png" },
    ];

    const ColorButton = styled(Button)(({ theme }) => ({
        color: `${theme.palette.getContrastText(purple[500])} !important`,
        backgroundColor: `${purple[500]} !important`,
        "&:hover": {
            backgroundColor: `${purple[700]} !important`,
        },
        "&.Mui-disabled": {
            backgroundColor: "#E0E0E0 !important",
            color: "#8C8C8C !important",
        },
    }));

    return (
        <>
            {QuizBuy || BalloonBuy ?
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
                            {Hash?.length === 0 ? TxnError ?
                                <div className="flex flex-col font-bold items-center justify-center">
                                    <p className="text-xl text-red-600">{TxnError}</p>
                                    <p className="mt-4 text-sky-800 text-xl">Please Try Again</p>
                                </div> :
                                <div className="flex flex-col font-bold items-center mb-2">
                                    <h3 className="text-xl text-slate-600 mb-2">Waiting for Transaction</h3>
                                    <svg className="animate-spin w-7 h-7 mt-6 fill-slate-800" viewBox="3 3 18 18">
                                        <path className="opacity-20" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
                                        </path>
                                        <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z">
                                        </path>
                                    </svg>
                                </div> :
                                <>
                                    <div className="flex flex-col font-bold items-center mb-2">
                                        <p className="text-xl text-slate-600 mb-2">Purchase Was Successful</p>
                                        <p className="border-b border-gray-300 pb-2 mr-2 flex-grow">
                                            <span className="font-bold flex flex-row items-center">Hash:&nbsp;
                                                {Hash}
                                            </span>
                                        </p>
                                    </div>
                                    {success ?
                                        <div className="flex flex-col text-center justify-center mt-2">
                                            <p className="text-green-700 text-xl my-2">Success</p>
                                            <Link href="/"><ColorButton variant="contained" size="large">View in main page</ColorButton></Link>
                                        </div> :
                                        <div className="flex text-xl font-bold text-green-800 justify-center mt-2">
                                            Setting up your points
                                            <svg className="animate-spin w-7 h-7 mr-3 fill-slate-800" viewBox="3 3 18 18">
                                                <path className="opacity-20" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
                                                </path>
                                                <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z">
                                                </path>
                                            </svg>
                                        </div>}
                                </>}
                        </CardContent>
                    </Card>
                </div > :
                <div className="mt-10 flex flex-col items-center text-center">
                    <h3 className="text-3xl font-bold text-slate-600">MarketPlace</h3>
                    <p className="my-5 text-emerald-800">Buy stuff for games of your choice</p>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="products-tabs"
                        sx={{ backgroundColor: 'transparent' }}
                    >
                        <Tab
                            value="quiz"
                            label={
                                <div>
                                    Quiz Game <HelpOutlineIcon fontSize="small" />
                                </div>
                            }
                        />
                        <Tab
                            value="balloon"
                            label={
                                <div>
                                    Balloon Game <BalloonIcon sx={{ fontSize: 40 }} />
                                </div>
                            }
                        />
                    </Tabs>
                    <Box sx={{ flexWrap: 'wrap', marginTop: 8, marginBottom: 8 }}>
                        <Grid
                            container
                            spacing={3}
                            justifyContent="center"
                        >
                            {value === 'quiz' && (
                                quizProducts.map((product, index) => (
                                    <Grid item key={index} style={{ width: '100%', minWidth: '250px' }} xs={4} >
                                        <ProductCard
                                            heading={product.heading}
                                            price={product.price}
                                            image={product.image}
                                            setBuy={setQuizBuy}
                                            setamount={setamount}
                                            Loading={Loading}
                                        />
                                    </Grid>
                                ))
                            )}
                            {value === 'balloon' && (
                                balloonProducts.map((product, index) => (
                                    <Grid item key={index} style={{ width: '100%', minWidth: '250px' }} xs={4} >
                                        <ProductCard
                                            heading={product.heading}
                                            price={product.price}
                                            image={product.image}
                                            setBuy={setBalloonBuy}
                                            setamount={setamount}
                                            Loading={Loading}
                                        />
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </Box>
                </div>}
        </>
    );
}

export default Market;