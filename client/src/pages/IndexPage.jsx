import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

const IndexPage = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("/books").then(response => {
        setBooks(response.data);
        })
    }, [])

    return (
        <div className="bg-blue-100 min-h-screen">
            <Header />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10 gap-x-6 gap-y-8 mx-20">
                {books.length > 0 && books.map(book => (
                    <Link to={"/books/"+book._id} key={book} className="flex gap-4 bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer">
                        <div className="w-20 h-36 flex shrink-0">
                            <img className="object-cover rounded-lg" src={"http://localhost:4000/uploads/" + book.photos[0]} alt="" />
                        </div>
                        <div className="flex flex-col truncate">
                            <h2 className="font-semibold text-lg">{book.title}</h2>
                            <h2 className="font-semibold text-md mb-3">by {book.author}</h2>
                            <h2>Genre : {book.genre}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default IndexPage;