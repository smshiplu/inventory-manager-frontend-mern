import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { ComponentHeader, Loading, SidebarMenu } from "../../components";
import { getUser } from "../../services";
import { SET_USER, selectUser } from "../../store/authSlice";
import { selectMenuToggle } from "../../store/btnSlice";

import { Action } from "./components/Action";
import { UserInfo } from "./components/UserInfo";



export const UserProfile = () => {
  const dispatch = useDispatch();
  const menuToggle = useSelector(selectMenuToggle);
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const [actionToggleBtn, setActionToggleBtn] = useState(false);
  

 useEffect(() => {
  const getUserProfile = async () => {
    setIsLoading(true);
    try {
      const data = await getUser();
      dispatch(SET_USER(data))
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }
  getUserProfile();
 }, [dispatch]); //eslint-disable-line
 
  return (
    <main>
      {isLoading && (
        <Loading />
      )}
      <ComponentHeader />
      <SidebarMenu />
      <section className={`p-4  ${menuToggle ? "md:ml-0 sm:ml-0" : "md:ml-64 sm:ml-64"}`}>
        <div className="w-full mx-auto min-h-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h3 className="text-2xl font-semibold dark:text-white my-2">User Profile</h3>
        <hr className="my-8 border border-gray-200 dark:border-gray-700 border-dashed" />
          
        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
            <Action 
              actionToggleBtn={actionToggleBtn}
              setActionToggleBtn={setActionToggleBtn} 
            />
            <UserInfo user={user} />
          </div>
        </div>

        </div>
      </section>
    </main>
  )
}
