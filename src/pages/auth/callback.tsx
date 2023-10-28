import { useContext, useEffect } from "react";
import { PassportContext, LogContext } from "../../utils/Context";
import { useAuthentication } from "../../utils/user/userAuthentication";

const Callback = () => {
    const { handleLoginCallback } = useAuthentication();
    const [Passport] = useContext(PassportContext);
    const [Log, setLog] = useContext(LogContext);    
    
    useEffect(() => {
        sessionStorage.setItem('Log', 'success')

        async function finalizeAuthentication() {
            try {
                handleLoginCallback();
                
                const userProfile = await Passport?.getUserInfo();
                if (!userProfile) {
                    setLog(true)
                } 
                
                window.opener?.postMessage({ type: 'authSuccess' }, '*');

                if (sessionStorage.getItem('Log')) {
                    window.close()
                    sessionStorage.removeItem('Log')
                }
            } catch (error) {
                console.error("Error during authentication:", error);
            }
        }        

        finalizeAuthentication();
    }, [Log]);

    return <div>Processing...</div>;
}

export default Callback;