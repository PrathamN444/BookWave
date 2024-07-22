import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import Header from '../components/Header';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {user, setUser} = useContext(UserContext);

    async function loginUser(ev){
        ev.preventDefault();
        const response = await axios.post("/login", {email, password});
        setUser(response.data);
        setRedirect(true);
    }

    if(user || redirect){
        return <Navigate to={"/"} />
    }

  return (
    <div>
        <Header/>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-300">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-center mb-2">
            <img src="https://img.icons8.com/ios-glyphs/90/000000/book.png" alt="Book Logo" className="h-12" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Welcome to BookWave</h2>
            <form onSubmit={loginUser}>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
                </label>
                <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                id="email"
                name="email"
                required
                value={email} onChange={(ev) => setEmail(ev.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                Password
                </label>
                <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                id="password"
                name="password"
                required
                value={password} onChange={(ev) => setPassword(ev.target.value)}
                />
            </div>
            <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
                Login
            </button>
            </form>
            <div className="mt-4 text-center">
            <Link to="/register" className="text-blue-500 hover:text-blue-700">
                Don't have an account? Register
            </Link>
            </div>
        </div>
        </div>
    </div>
  );
};

export default LoginPage;
