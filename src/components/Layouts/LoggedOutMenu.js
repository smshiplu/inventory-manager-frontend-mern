import { NavLink } from "react-router-dom"

export const LoggedOutMenu = () => {
  return (
    <>
    <li className="flex items-center justify-center ">
      <button className="hover:scale-95 focus:scale-95 transition">
        <NavLink to="/register" className="px-4 py-2 rounded-sm">Register</NavLink>
      </button>
    </li>
    <li className="flex items-center justify-center ">
      <button className="hover:scale-95 focus:scale-95 transition">
        <NavLink to="/login" className="px-4 py-2 rounded-sm">Login</NavLink>
      </button>
      
    </li>
    </>
  )
}
