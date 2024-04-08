import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { logout } from "../../services";
import { SET_LOGIN } from "../../store/authSlice";


export const LoggedInMenu = ({setIsLoading}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      dispatch(SET_LOGIN(false));
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message)
    }
  }

  return (
    <>
    <li className="flex items-center justify-center ">
      <button className="hover:scale-95 focus:scale-95 transition">
        <NavLink to="/dashboard" className="px-4 py-2 rounded-sm">Dashboard</NavLink>
      </button>
    </li>
    <li className="flex items-center justify-center ">
      <button onClick={handleLogout} className="bg-rose-600 px-4 py-2 rounded-sm hover:scale-95 focus:scale-95 transition">Logout</button>
    </li>
    </>
  )
}
