import { useContext, useEffect } from "react"
import { PassportContext } from "../../utils/Context";
import { useAuthentication } from '../../utils/user/userAuthentication'

const Callback = () => {
    const { handleLoginCallback } = useAuthentication();
    
    useEffect(() => {
        async function finalizeLoginCallback() {
            await handleLoginCallback();
            // Notify the main window
            window.opener?.postMessage({ type: 'authSuccess' }, '*');
            // Close this pop-up
            window.close();
        }

        finalizeLoginCallback();
    }, []);

    return <div>Callback</div>;
}

export default Callback;
