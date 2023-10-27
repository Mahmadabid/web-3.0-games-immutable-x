import { useEffect } from "react"
import { useAuthentication } from '../../utils/user/userAuthentication'

const Callback = () => {
    const { handleLoginCallback } = useAuthentication();

    useEffect(() => {
        function finalizeLoginCallback() {
            handleLoginCallback();
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
