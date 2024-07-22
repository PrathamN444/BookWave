import { useContext, useState } from "react";
import Header from "../components/Header";
import { UserContext } from "../components/UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {

    const {user, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    async function logoutUser(){
        await axios.post("/logout");
        setUser(null);
        setRedirect(true);
    }

    if(redirect){
        return <Navigate to={"/"} />
    }

    return (
        <div className="bg-blue-100 min-h-screen">
            <Header/>
            {!!user && (
                <div className="flex flex-col items-center gap-3 text-lg mt-32" >
                    <div className="">Welcome {user.name} !</div>
                    <div>This is your profile section</div>
                    <div className="">Logged in as {user.name} [ {user.email} ]</div>
                    <button onClick={logoutUser}  className="border rounded-full text-white py-2 px-6 mt-3 bg-blue-500">Logout</button>
                </div>   
            )}
        </div>
    );
}

export default ProfilePage;