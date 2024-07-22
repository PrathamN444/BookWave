import { Outlet } from "react-router-dom"
import Header from "./Header"

const Layout = () => {
  return (
    <div className="py-6 px-20 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout