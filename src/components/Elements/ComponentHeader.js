import { useEffect, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { GoMoon } from "react-icons/go";
import { MdOutlineWbSunny } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { selectName } from "../../store/authSlice";
import { SET_MENU_TOGGLE, selectMenuToggle } from "../../store/btnSlice";



export const ComponentHeader = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectName);
  const menuToggle = useSelector(selectMenuToggle);
  const dark = JSON.parse(localStorage.getItem("pinvent-dark"));
  const [darkModeToggle, setDarkModeToggle] = useState(dark ? dark : false);

  useEffect(() => {
    if(darkModeToggle) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("pinvent-dark", JSON.stringify(true));
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("pinvent-dark", JSON.stringify(false));
    }
  }, [darkModeToggle]);

  return (
    <section className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
      <button onClick={() => dispatch(SET_MENU_TOGGLE(!menuToggle))} className="inline-flex items-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <FaBarsStaggered className="w-5 h-5"/>
      </button>
      <div className="flex items-center gap-5">
        {!darkModeToggle && (
          <button onClick={() => setDarkModeToggle(true)}><GoMoon /></button>
        )}
        {darkModeToggle && (
          <button onClick={() => setDarkModeToggle(false)}><MdOutlineWbSunny /></button>
        )}
        
        <p className="capitalize text-sm">
          Welcome, <span className=" font-semibold">
          {name}</span>
        </p>
      </div>

    </section>
  )
}
