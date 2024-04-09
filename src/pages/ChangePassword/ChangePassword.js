import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { ComponentHeader, Loading, SidebarMenu } from "../../components";
import { FormField } from "./components/FormField";

import { updatePassword } from "../../services";
import { selectMenuToggle } from "../../store/btnSlice";


const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: ""
}

export const ChangePassword = () => {
  const navigate = useNavigate();
  const menuToggle = useSelector(selectMenuToggle);
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  }

  const savePassword = async (e) => {
    e.preventDefault();
    if(!formData.newPassword || !formData.confirmPassword || !formData.currentPassword) {
      return toast.error("Fill in all required field");
    }
    if(formData.newPassword.length < 6 ) {
      return toast.error("Please enter password minimum 6 characters");
    }
    if(formData.newPassword !== formData.confirmPassword) {
      return toast.error("Confirm password not matched");
    }
    const userData = {
      oldPassword: formData.currentPassword,
      password: formData.newPassword 
    }
    setIsLoading(true);
    try {
      const data = await updatePassword(userData);
      setIsLoading(false);
      if(data) {
        toast.success("Password updated successfully");
        navigate("/userProfile");
      }

    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }

  }

  const formItems = [
    {
      label: <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>,
      input: <input onChange={handleInputChange} type="password" id="currentPassword" name="currentPassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" autoComplete="off" required />,
      icon1: <FaRegEye />,
      icon2: <FaRegEyeSlash />
    },
    {
      label: <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>,
      input: <input onChange={handleInputChange} type="password" id="newPassword" name="newPassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" autoComplete="off" required/>,
      icon1: <FaRegEye />,
      icon2: <FaRegEyeSlash />
    },
    {
      label: <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm New Password</label>,
      input: <input onChange={handleInputChange} type="password" id="confirmPassword" name="confirmPassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" autoComplete="off" required />,
      icon1: <FaRegEye />,
      icon2: <FaRegEyeSlash />
    }
  ]

  return (
    <main>
      {isLoading && (
        <Loading />
      )}
      <ComponentHeader />
      <SidebarMenu />
      <section className={`p-4  ${menuToggle ? "md:ml-0 sm:ml-0" : "md:ml-64 sm:ml-64"}`}>
        <div className="w-full mx-auto min-h-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h3 className="text-2xl font-semibold dark:text-white my-2">Change Password</h3>
          <hr className="my-8 border border-gray-200 dark:border-gray-700 border-dashed" />

          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center pb-10">
                <form onSubmit={savePassword} className="p-4 w-full">
                  {formItems.map((item, idx) => (
                    <FormField key={idx} item={item}/>
                  ))}
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Changes Password</button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
