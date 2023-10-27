import { useContext } from "react";
import { UserContext, PassportContext } from "../Context";
import { ethers } from "ethers";

export const useAuthentication = () => {
    const User = useContext(UserContext);
    const passportProvider = useContext(PassportContext);
    const passport = passportProvider[0];

    const logIn = async () => {
        if (!passport) return;

        try {
            const passportProvider = passport.connectEvm();
            const provider = new ethers.providers.Web3Provider(passportProvider);
            const accounts = await provider.send("eth_requestAccounts", []);

            const signer = provider.getSigner();
            const address = await signer.getAddress();

            // const redprovider = passport.connectEvm();
            // const redaccounts = await redprovider.request({ method: "eth_requestAccounts" });
            // console.log(await passport.getUserInfo(), 'hi')
            // console.log('111', redaccounts)
            console.log(222, signer)
            console.log(333, address)
            console.log(444, accounts)
            
        } catch (error: any) {
            console.error("Login error:", error.message || error);
        }
    };

    const logOut = async () => {
        await passport?.logout();
        User[1](false);
    };

    const handleLoginCallback = () => {
        if (passport) {
            passport.loginCallback();
        } else {
            console.error("Passport instance is not available.");
        }
    }

    return { logIn, logOut, handleLoginCallback };
};
