import { NavLink } from "react-router-dom"

export const LoggedOutMenu = () => {
  return (
    <>
    <li className="flex items-center justify-center ">
      <NavLink to="/register" className="px-4 py-2 rounded-lg hover:scale-95 focus:scale-95 transition">Register</NavLink>
    </li>
    <li className="flex items-center justify-center ">
      <NavLink to="/login" className="px-4 py-2 rounded-lg hover:scale-95 focus:scale-95 transition">Login</NavLink>
    </li>
    </>
  )
}
