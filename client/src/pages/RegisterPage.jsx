import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import Header from '../components/Header';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function registerUser(ev){
        ev.preventDefault();
        const response = await axios.post("/register", {email, name, password});
        console.log(response.data);
        setRedirect(true);
    }

    if(redirect){
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
            <form onSubmit={registerUser}>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" placeholder='username@email.com' required
                value={email} 
                onChange={(ev) => setEmail(ev.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" required placeholder='Username'
                value={name} 
                onChange={(ev) => setName(ev.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" required placeholder='Password'
                    value={password} 
                    onChange={(ev) => setPassword(ev.target.value)}
                />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                Sign up
            </button>
            </form>
            <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
                Already an user ? Login here
            </Link>
            </div>
        </div>
        </div>
    </div>
  );
};

export default LoginPage;
