import { useState } from "react";
import { Link } from "react-router-dom";
import { TbCircleLetterP } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Loading } from "../Elements/Loading";

import { selectIsLoggedIn } from "../../store/authSlice";
import { LoggedInMenu } from "./LoggedInMenu";
import { LoggedOutMenu } from "./LoggedOutMenu";

export const Header = () => { 
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <>
    {isLoading && (
      <Loading />
    )}
    <header className="w-full bg-blue-900 text-white">
      <nav className="container max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center ">
            <TbCircleLetterP className="text-4xl" /></Link>
            <ul className="flex gap-2">
              {isLoggedIn ? <LoggedInMenu setIsLoading={setIsLoading} /> : <LoggedOutMenu />}
            </ul>
        </div>
      </nav>
    </header>
    </>
  )
}
