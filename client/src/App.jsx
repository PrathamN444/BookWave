import { Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import IndexPage from "./pages/IndexPage";
import axios from "axios";
import { UserContextProvider } from "./components/UserContext";
import ProfilePage from "./pages/ProfilePage";
import MyBooksPage from "./pages/MyBooksPage";
import BookForm from "./components/BookForm";
import SingleBookPage from "./pages/SingleBookPage";


axios.defaults.baseURL = "https://book-wave-backend.vercel.app";
axios.defaults.withCredentials = true; 

function App() {

  return (
    <UserContextProvider>
        <Routes>
          <Route index element={<IndexPage/>} />
          <Route path="/" element={<IndexPage/>} />
          <Route path="/login" element={<LoginPage/> } />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/account" element={<ProfilePage/>} />
          <Route path="/account/books" element={<MyBooksPage/>} />
          <Route path="/account/books/new" element={<BookForm/>} />
          <Route path="/books/:id" element={<SingleBookPage/>} />
          <Route path="/account/books/:id" element={<BookForm/>} />
        </Routes>
    </UserContextProvider>
  )
}

export default App;
