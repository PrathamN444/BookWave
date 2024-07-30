import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleBookPage = () => {

    const {id} = useParams();
    const [bookInfo, setBookInfo] = useState(null);
    const[rating, setRating] = useState('');
    const[comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`/books/${id}`).then(response => {
            setBookInfo(response.data);
            setReviews(response.data.reviews);
        })
    }, [id]);

    async function AddMyReview(ev){
        ev.preventDefault();
        const response = await axios.post(`/${id}/reviews`, {rating, comment, id});
        setReviews(response.data.reviews);
        setRating('');
        setComment('');
    }

    function booksRating(reviews){
        if(reviews.length === 0) return 0;
        let totalRating = reviews.reduce((sum, review) => sum+review.rating , 0);
        totalRating /= reviews.length;
        return (totalRating % 1 === 0 ? totalRating : totalRating.toFixed(1));
    }

    if(!bookInfo) return '';

    console.log(bookInfo);

    return (

        <div className="bg-blue-100 min-h-screen">
            <Header/>
            <div className="mx-28 mt-12 bg-blue-200 p-10 rounded-lg">
                <div className="flex gap-7">
                    <div className="w-60 h-60 flex shrink-0">
                        <img className="object-cover aspect-square rounded-lg" src={"https://book-wave-backend.vercel.app/uploads/" + bookInfo.photos[0]} alt="" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-2xl">{bookInfo.title}</h2>
                        <h2 className="font-semibold pt-1 text-lg">a {bookInfo.genre} by {bookInfo.author}</h2>
                        {booksRating(bookInfo.reviews) === 0 ? 
                                <h2 className="text-sm text-gray-600 font-semibold mt-7">No rating yet</h2> : 
                                <div className="flex items-center mt-7">
                                    <h2>{booksRating(bookInfo.reviews)}</h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-green-600">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                    <h2 className="pl-1">Rating</h2>
                                </div>
                            }
                        <div className="flex gap-2 items-center mt-4 border border-white p-3 shadow-md rounded-md cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-orange-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                            </svg>
                            <h2 className="font-semibold text-lg">Play the book for me</h2>
                        </div>
                    </div>
                </div>
                <div className="my-7 shadow-md p-5 border rounded-md border-white">
                    <div className="font-semibold text-xl pb-2">About the book</div>
                    <div>{bookInfo.description}</div>
                </div>

                <div className="my-7 shadow-md px-8 py-5  border rounded-md border-white">
                    <h2 className="mb-2 font-semibold text-lg">Add your review</h2>
                    <div className="flex gap-2">
                        <textarea className="w-full rounded-md h-12 p-1" value={comment} onChange={(ev) => setComment(ev.target.value)}/>  
                        <input type="Number" placeholder="Rating" className="w-20 rounded-md p-1 text-center" value={rating} onChange={(ev) => setRating(ev.target.value)}/>
                        <button className="bg-blue-500 px-3 py-1 text-white rounded-md" onClick={AddMyReview}>Add&nbsp;review</button>
                    </div>
                    <h2 className="font-semibold mb-4 mt-5 text-lg">All reviews</h2>
                    {reviews.length > 0 && reviews.map(review => (
                        <div key={review} className="mb-3 border-t pt-3 px-3 border-white">
                            <div className="flex items-center gap-5">
                                <div className="flex gap-1 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-gray-500">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                    </svg>
                                    <h2 className="font-semibold">{review.user}</h2>
                                </div>
                                <div className="flex items-center">
                                    <h2>{review.rating}</h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-green-600">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="pl-7">{review.comment}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SingleBookPage;