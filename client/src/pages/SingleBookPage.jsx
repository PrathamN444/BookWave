import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleBookPage = () => {

    const {id} = useParams();
    const [bookInfo, setBookInfo] = useState(null);
    const[rating, setRating] = useState('');
    const[newComment, setNewComment] = useState('');
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        axios.get(`/books/${id}`).then(response => {
            setBookInfo(response.data);
        })
    }, [id]);

    useEffect(() => {
        axios.get(`/reviews/${id}`).then(response => {
            setReviews(response.data);
        })
    }, []);

    async function AddMyReview(ev){
        ev.preventDefault();
        await axios.post("/reviews", {rating, newComment, id});
        setRating('');
        setNewComment('');
    }

    if(!bookInfo) return '';

    console.log(reviews);

    return (

        <div className="bg-blue-100 min-h-screen">
            <Header/>
            <div className="mx-28 mt-12 bg-blue-200 p-10 rounded-lg">
                <div className="flex gap-7">
                    <div className="w-60 h-60 flex shrink-0">
                        <img className="object-cover aspect-square rounded-lg" src={"http://localhost:4000/uploads/" + bookInfo.photos[0]} alt="" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-2xl">{bookInfo.title}</h2>
                        <h2 className="font-semibold pt-1 text-lg">a {bookInfo.genre} by {bookInfo.author}</h2>
                        <div className="flex gap-2 items-center mt-10 border border-white p-3 shadow-md rounded-md cursor-pointer">
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

                <div className="my-7 shadow-md p-5  border rounded-md border-white">
                    <h2 className="mb-2 font-semibold">Add your review</h2>
                    <div className="flex gap-2">
                        <textarea className="w-full rounded-md h-12 p-1" value={newComment} onChange={(ev) => setNewComment(ev.target.value)}/>  
                        <input type="Number" placeholder="Rating" className="w-20 rounded-md p-1 text-center" value={rating} onChange={(ev) => setRating(ev.target.value)}/>
                        <button className="bg-blue-500 px-3 py-1 text-white rounded-md" onClick={AddMyReview}>Add&nbsp;review</button>
                    </div>
                    <h2 className="font-semibold mt-2">All reviews</h2>
                    {!!reviews && reviews.map(review => (
                        <div key={review}>{review.comment}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SingleBookPage;