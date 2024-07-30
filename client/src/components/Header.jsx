import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext"

const Header = () => {

    const {user} = useContext(UserContext);

  return (
    <div className="flex items-center justify-between py-7 px-20 bg-gradient-to-r from-blue-300 to-purple-300">

        <Link to={"/"} className="flex place-items-end gap-1 pr-4 items-center">
            <img src="https://img.icons8.com/ios-glyphs/90/000000/book.png" alt="Book Logo" className="h-10" />
            <span className="font-bold text-2xl text-black">BookWave</span>
        </Link>

        <div className="flex items-center gap-3 border border-white rounded-full py-2 px-4 shadow-md">
          <div className="font-bold text-lg border-r pr-4 border-white ">Best sellers</div>
          <div className="font-bold text-lg border-r pr-4 border-white">Motivation</div>
          <div className="font-bold text-lg">New Release</div>
        </div>

        <div className="flex items-center border border-white rounded-full shadow-md py-2 px-4 gap-2 cursor-pointer">
            {!!user && (
              <Link to={"/account/books"} className="border-r pr-3 font-semibold text-lg flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                  Your books
              </Link>
            )}
            <Link to={user ? "/account" : "/login"} className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-gray-500">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>
                {!user && (
                  <div className="font-semibold border-l pl-2">Login</div>
                )}
                {!!user && (
                <div className="font-semibold text-lg">{user.name}</div>     
                )}
            </Link>
        </div>

      </div>
  )
}

export default Header