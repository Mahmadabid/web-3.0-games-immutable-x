import Link from "next/link";

const Login = () => {
    return (
        <div className="flex flex-col items-center mt-52">
            <p className="text-center text-xl mb-4">Please login to Play.</p>
            <Link href=""><button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Login/Signup</button></Link>
        </div >
    )
}

export default Login;