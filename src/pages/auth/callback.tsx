import { useEffect } from "react";
import { useAuthentication } from "../../utils/user/userAuthentication";

const Callback = () => {
    const { handleLoginCallback } = useAuthentication();

    useEffect(() => {

        handleLoginCallback();

        window.opener?.postMessage({ type: 'authSuccess' }, '*');

        window.close();

    }, [handleLoginCallback]);

    return <div>Processing...</div>;
}

export default Callback;
