import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDashboard } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

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
      <NavLink to="/dashboard" className="flex items-center gap-1 px-4 py-2 rounded-lg hover:scale-95 focus:scale-95 transition"><MdDashboard className="w-6 h-6" /> <span>Dashboard</span></NavLink>
    </li>
    <li className="flex items-center justify-center ">
      <button onClick={handleLogout} className="flex items-center gap-1 bg-rose-600 px-4 py-2 rounded-lg hover:scale-95 focus:scale-95 transition"><BiLogOut className="w-6 h-6" /> <span>Logout</span> </button>
    </li>
    </>
  )
}
