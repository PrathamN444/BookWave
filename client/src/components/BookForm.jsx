import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

const BookForm = () => {

    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState([]);
    const [uploadLink, setUploadLink] = useState('');
    const [redirect, setRedirect] = useState('');

    useEffect(() => {
        if(id){
            axios.get("/books/"+id).then(response => {
                const {data} = response;
                setTitle(data.title);
                setAuthor(data.author);
                setPhotos(data.photos);
                setDescription(data.description);
                setGenre(data.genre);
            })
        }
        else{
            return;
        }
    }, [id]);

    async function addPhotosByLink(ev){
        ev.preventDefault();
        if(uploadLink){
            const {data} = await axios.post("/upload-by-link", {link : uploadLink});
            setPhotos(prev => {
                return [...prev, data];
            });
            setUploadLink('');
        }
    }

    async function uploadPhotoFromDevice(ev){
        const files = ev.target.files;
        const filesData = new FormData();
        for(let i=0; i<files.length; i++){
            filesData.append('photos', files[i]);
        }
        const {data} = await axios.post("/upload", filesData, {
            headers: {'Content-type': 'multipart/form-data'}
        })
        setPhotos(prev => {
            return [...prev, ...data];
        });
    }

    async function saveMyBook(ev){
        ev.preventDefault();
        const booksData = {title, author, genre, description, photos};
        if(id){
            await axios.put("/books", {
                id, ...booksData
            });
        }
        else{
            await axios.post("/books", booksData);
        }
        setRedirect('/account/books');
    }

    if(redirect){
        return <Navigate to={redirect} /> ;
    }

    function deletePhoto(ev, link){
        ev.preventDefault();
        setPhotos([...photos.filter(photo => photo !== link)]);
    }

    function setAsMainPhoto(ev, link){
        ev.preventDefault();
        setPhotos([link, ...photos.filter(photo => photo !== link)]);
    }

    return (
        <div className="bg-blue-100 min-h-screen">
            <Header/>
            <form className="px-32 py-5" onSubmit={saveMyBook}>
                <div className="grid grid-cols-3 gap-5">
                    <div>
                        <h2 className="text-xl mr-1 mt-2 pl-2">Title</h2>
                        <input type="text" placeholder="Book name" value={title} onChange={ev => setTitle(ev.target.value)}
                            className="m-2 p-2 ml-0 border border-gray-500 rounded-2xl w-full hover:shadow-md" 
                        />
                    </div>
                    <div>
                        <h2 className="text-xl mr-1 mt-2 pl-2">Author</h2>
                        <input type="text" placeholder="Author name" value={author} onChange={ev => setAuthor(ev.target.value)}
                            className="m-2 p-2 ml-0 border border-gray-500 rounded-2xl w-full hover:shadow-md" 
                        />
                    </div>
                    <div>
                        <h2 className="text-xl mr-1 mt-2 pl-2">Genre</h2>
                        <input type="text" placeholder="Genre" value={genre} onChange={ev => setGenre(ev.target.value)}
                            className="m-2 p-2 ml-0 border border-gray-500 rounded-2xl w-full hover:shadow-md" 
                        />
                    </div>
                </div>

                <h2 className="text-xl inline-block mr-1 mt-2">Photos</h2>
                <p className="inline-block text-sm text-gray-500">( cover photos for the book )</p>
                <div className="flex gap-2">
                    <input type="text" value={uploadLink} onChange={ev => setUploadLink(ev.target.value)} placeholder="Add photos using a link .....jpg" className="mt-2 p-2 ml-0 border border-gray-500 rounded-2xl w-full hover:shadow-md"/>
                    <button onClick={addPhotosByLink} className="bg-blue-500 border rounded-2xl px-4 hover:shadow-md text-white">Add&nbsp;photo</button>
                </div>

                <div className="mt-2 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {photos.length > 0 && photos.map((link) => (
                        <div key={link} className="h-32 flex relative">
                            <img className="rounded-2xl w-full object cover" src={'http://localhost:4000/uploads/' + link} alt="" />
                            <button onClick={(ev) => deletePhoto(ev, link)} className="absolute bottom-1 right-1 text-white bg-black p-1 rounded-xl bg-opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                            <button onClick={(ev) => setAsMainPhoto(ev, link)} className="absolute bottom-1 right-10 text-white bg-black p-1 rounded-xl bg-opacity-50">
                                {link === photos[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                  
                                )}
                                {link !== photos[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    ))}
                    <label className="h-32 cursor-pointer border bg-transparent p-7 rounded-2xl text-gray-500 text-xl border-gray-500 hover:shadow-md flex items-center justify-center gap-2">
                        <input type="file" multiple className="hidden" onChange={uploadPhotoFromDevice}/>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        Upload
                    </label>
                </div>

                <h2 className="text-xl inline-block mr-1 mt-2">Description</h2>
                <p className="inline-block text-sm text-gray-500">( Introduction passage for your book )</p>
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} className="m-2 p-2 ml-0 border border-gray-500 rounded-lg w-full hover:shadow-md size-auto h-40" />

                <button className="bg-blue-500 mt-6 mb-1 mx-auto py-2 px-10 rounded-full text-white">Save My Book</button>
            </form>
        </div>
    );
}

export default BookForm;