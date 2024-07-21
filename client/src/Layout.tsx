import { Outlet } from "react-router-dom"
import Sidebar from "./containers/Sidebar"

function Layout() {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Layout