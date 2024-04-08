import { Link, NavLink } from "react-router-dom";
import { TbCircleLetterP } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { RiProfileFill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { MdOutlineAddchart } from "react-icons/md";
import { TbMessageReport } from "react-icons/tb";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectDorpDownToggle, selectMenuToggle, SET_DROPDOWN_TOGGLE, SET_MENU_TOGGLE } from "../../store/btnSlice";


export const SidebarMenu = () => {
  const dispatch = useDispatch();
  const dorpDownToggle = useSelector(selectDorpDownToggle);
  const menuToggle = useSelector(selectMenuToggle);
  
  return (
    <aside id="sidebar-multi-level-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-all ${menuToggle ? "md:-translate-x-full sm:-translate-x-full" : "-translate-x-full sm:translate-x-0" }`} aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        
        <div className="w-full flex items-end justify-end mb-4"> 
          <button onClick={() => dispatch(SET_MENU_TOGGLE(!menuToggle))}>
            <FaTimes className="inline-block w-5 h-5 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 cursor-pointer" />
          </button>
        </div>
          
        <ul className="space-y-2 font-medium">
          <li>
            <Link to="/"  onClick={() => dispatch(SET_DROPDOWN_TOGGLE(false))} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:scale-95 focus:scale-95 transition">
                <TbCircleLetterP className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                <span className="ms-3">Home</span>
            </Link>
          </li>
          <li>
              <NavLink to="/dashboard" onClick={() => dispatch(SET_DROPDOWN_TOGGLE(false))} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:scale-95 focus:scale-95 transition">
                <MdDashboard className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Dashboard</span>
              </NavLink>
          </li>
          <li>
            <NavLink to="/addProduct"  onClick={() => dispatch(SET_DROPDOWN_TOGGLE(false))} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:scale-95 focus:scale-95 transition">
              <MdOutlineAddchart className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ms-3">Add Product</span>
            </NavLink>
          </li>
          <li>
            <button onClick={() => dispatch(SET_DROPDOWN_TOGGLE(!dorpDownToggle))} type="button" className="flex items-center w-full p-2 text-base text-gray-900 duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 hover:scale-95 focus:scale-95 transition" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
            <RiProfileFill className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"/>
            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Account</span>
            {dorpDownToggle ?  <FaAngleUp /> : <FaAngleDown /> }
            </button>
            <ul id="dropdown-example" className={`${dorpDownToggle ? "visible " : "hidden"} py-2 space-y-2`}>
              <li>
                <NavLink to="/userProfile" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 hover:scale-95 focus:scale-95">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/editProfile" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 hover:scale-95 focus:scale-95">Edit Profile</NavLink>
              </li>
              <li>
                <NavLink to="/changePassword" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 hover:scale-95 focus:scale-95">Change Password</NavLink>
              </li>
            </ul>
          </li>
          <li>
              <NavLink to="/contact" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:scale-95 focus:scale-95 transition">
                <TbMessageReport className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Report Bug</span>
              </NavLink>
          </li>
        </ul>
      </div>
  </aside>
  )
}
