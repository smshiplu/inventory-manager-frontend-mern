import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Action = ({actionToggleBtn, setActionToggleBtn}) => {
  return (
    <div className=" flex justify-end px-4 pt-4">
      <button onClick={() => setActionToggleBtn(!actionToggleBtn)} id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
        <span className="sr-only">Open dropdown</span>
        <BsThreeDots className="w-5 h-5"/>
      </button>
        
      <div id="dropdown" className={`${actionToggleBtn ? "visible" : "hidden"} absolute top-14 -right-0 md:-right-14 z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
        <ul className="py-2" aria-labelledby="dropdownButton">
          <li>
            <Link to="/editProfile" onClick={() => setActionToggleBtn(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit Profile</Link>
            <Link to="/changePassword" onClick={() => setActionToggleBtn(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Change Password</Link>
          </li>
        </ul>
      </div>
  </div>
  )
}
