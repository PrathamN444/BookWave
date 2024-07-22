import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const MyBooksPage = () => {

    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        axios.get("/user-books").then(response => {
            setBooks(response.data);
        });
    }, [])

    return (
        <div className="bg-blue-100 min-h-screen">
            <Header/>
            <div className="text-center mt-10">
                <Link to={"/account/books/new"} className="bg-blue-500 py-2 px-5 inline-flex gap-1 rounded-full text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
                    Add New Book
                </Link>
            </div> 
            <div className="mt-8 px-20 grid grid-cols-3 gap-x-7 gap-y-7">
                {books.length > 0 && books.map(book => (
                    <div key={book} className="flex gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
                        <div className="w-24 h-44 flex shrink-0 ">
                            <img className="object-cover rounded-lg" src={"http://localhost:4000/uploads/" + book.photos[0]} alt="" />
                        </div>
                        <div className="flex flex-col truncate">
                            <Link className="font-semibold text-xl cursor-pointer" to={"/account/places/" + book._id } >{book.title}</Link>
                            <h2 className="font-semibold text-md mb-3">by {book.author}</h2>
                            <h2>Genre : {book.genre}</h2>
                            <h2 className="text-sm">{book.description}</h2>
                        </div>
                    </div>
                ))}    
            </div> 
        </div>
    );
}

export default MyBooksPage;