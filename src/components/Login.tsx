import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { PassportContext } from '../utils/Context';

const Login = () => {
  const router = useRouter();
  const [passport, setPassport] = useContext(PassportContext);
  const [provider, setProvider] = useState<any>(null);
console.log(provider)
console.log('passport',passport)
  const login = async () => {
    if (!passport) return;

      const providerInstance = await passport.connectEvm();
      setProvider(providerInstance);

      const accounts = await providerInstance.request({ method: 'eth_requestAccounts' });
      console.log(accounts);
  };

  useEffect(() => {
    const handleLoginCallback = async () => {
      if (router.query.code && provider) {
        await provider.loginCallback();
        router.push('/');
      }
    };

    handleLoginCallback();
  }, [router.query, provider]);

  return (
    <div className="flex flex-col items-center mt-52">
      <p className="text-center text-xl mb-4">Please login to Play.</p>
      <button onClick={login} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Login/Signup</button>
    </div>
  );
};

export default Login;



// https://auth.immutable.com/authorize?client_id=undefined&redirect_uri=undefined&response_type=code&scope=openid+offline_access+email+transact&state=509aa48eaf11405d82bb5c09d9738094&code_challenge=l12JhJFL-vedEuF0ayhjHtXrlbOKxBxUhEMu4vs_ppw&code_challenge_method=S256&response_mode=query&display=popup&audience=platform_api
// https://auth.immutable.com/login?state=hKFo2SBucnhLTTBCbzM0STI3dXIxTmFOMEFwQ28xaUl2NkhKUqFupWxvZ2luo3RpZNkgRjBEWEpWa2VSRnhoQnRSTXRRZ0d5QjFnTmJZbnJhMGijY2lk2SBJTXBVUFgyUDdNT01lSko1SHVBTzFJTERGWW1aWEpSeg&client=IMpUPX2P7MOMeJJ5HuAO1ILDFYmZXJRz&protocol=oauth2&scope=openid%20profile%20email%20offline_access%20create%3Acollections%20update%3Acollections%20read%3Acollections%20create%3Aprojects%20read%3Aprojects%20update%3Aprojects%20create%3Acollections%20update%3Acollections%20view%3Apassport%20create%3Aclients%20read%3Aclients%20update%3Aclients%20delete%3Aclients&response_type=code&redirect_uri=https%3A%2F%2Fhub.immutable.com%2Fapi%2Fauth%2Fcallback&audience=platform_api&nonce=qN5T84WNtJQ6LTnw5dw6FcMjhE7NUAkkY_btnMfygSQ&code_challenge=Pr9TYwAkxSXhSYNlZyNROlmjthCGLIN90u19gOs9UrU&code_challenge_method=S256