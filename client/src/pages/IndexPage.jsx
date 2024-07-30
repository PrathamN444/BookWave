import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

const IndexPage = () => {

    const [books, setBooks] = useState([]);
    const [change, setChange] = useState('');
    const [selectedRating, setSelectedRating] = useState('')

    useEffect(() => {
        axios.get("/books").then(response => {
        setBooks(response.data);
        })
    }, [])

    function booksRating(reviews){
        if(reviews.length === 0) return 0;
        let totalRating = reviews.reduce((sum, review) => sum+review.rating , 0);
        totalRating /= reviews.length;
        return (totalRating % 1 === 0 ? totalRating : totalRating.toFixed(1));
    }

    return (
        <div className="bg-blue-100 min-h-screen">
            <Header />
            <div className="flex gap-5 items-center">
                <div className="ml-20 mt-5 mb-10 flex items-center gap-3 border py-3 px-3 border-white w-1/3 rounded-lg shadow-md">
                    <div className="p-1 font-semibold text-gray-500">Search your book or author :</div>
                    <input type="text" className=" p-1 text-center rounded-md w-1/2 bg-blue-50" placeholder="Search book here" value={change} onChange={e => setChange(e.target.value)}/>
                </div>
                <div className="flex gap-2 mb-5 border border-white px-3 py-3 rounded-lg shadow-md items-center">
                    <h2 className="font-semibold text-gray-500">Filter by ratings</h2>
                    <select className="p-1 border border-gray-300 rounded font-semibold text-gray-500 cursor-pointer" value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
                        <option value="">All Ratings</option>
                        <option value="1">1★ & above</option>
                        <option value="2">2★ & above</option>
                        <option value="3">3★ & above</option>
                        <option value="4">4★ & above</option>
                        <option value="5">5★</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-5 gap-x-6 gap-y-8 mx-20">
                {books.length > 0 && books.filter((book) => 
                    (
                        (change.toLowerCase() === '' ? book : ( book.genre.toLowerCase().includes(change.toLowerCase()) || book.author.toLowerCase().includes(change.toLowerCase()) || book.title.toLowerCase().includes(change.toLowerCase()) )) && 
                        (booksRating(book.reviews) >= selectedRating)
                    )).map(book => (
                    <Link to={"/books/"+book._id} key={book} className="flex gap-4 bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer">
                        <div className="w-20 h-36 flex shrink-0">
                            <img className="object-cover rounded-lg" src={"https://book-wave-backend.onrender.com/uploads/" + book.photos[0]} alt="" />
                        </div>
                        <div className="flex flex-col truncate">
                            <h2 className="font-semibold text-lg">{book.title}</h2>
                            <h2 className="font-semibold text-md mb-3">by {book.author}</h2>
                            <h2 className="mb-2">Genre : {book.genre}</h2>
                            {booksRating(book.reviews) === 0 ? 
                                <h2 className="text-sm text-gray-600">No rating yet</h2> : 
                                <div className="flex items-center">
                                    <h2>{booksRating(book.reviews)}</h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-green-600">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                    <h2 className="pl-1">Rating</h2>
                                </div>
                            }
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default IndexPage;