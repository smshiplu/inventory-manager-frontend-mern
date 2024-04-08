import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { validateEmail, login } from "../../services";
import { Loading } from "../../components";
import { SET_LOGIN, SET_NAME } from "../../store/authSlice";


export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validation()) {
      return toast.error("Please fill in all required field")
    }

    if(!validateEmail(formData.email)) {
      return toast.error("Please fill in all required field")
    }

    if(formData.password.length < 6) {
      toast.error("Password must be upto 6 characters");
    }

    const userData = {
      email: formData.email,
      password: formData.password
    }

    setIsLoading(true);
    try {
      const user = await login(userData);
      if(user) {
        dispatch(SET_LOGIN(true)); 
        dispatch(SET_NAME(user.name));
        e.target.reset();
        navigate("/dashboard");
        setIsLoading(false);
        
      } else {
        dispatch(SET_LOGIN(false)); 
        toast.error(user);
        setIsLoading(false);
      }

    } catch (error) {
      dispatch(SET_LOGIN(false)); 
      setIsLoading(false);
      toast.error(error.message);
    }

  }

  // Form validation
  function validation () {
    let validationPass = true;
    for(const field in formData) {
      if(!formData[field]) {
        validationPass = false;
      }
    }
    return validationPass;
  }

  return (
    <>
    {isLoading && (
      <Loading />
    )}
    <main className="w-full min-h-dvh bg-blue-900">
      <div className="container max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-center">
          <div className="anim-bounce w-96 p-4 flex flex-col items-center justify-center  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <BiLogIn className="text-4xl text-gray-400"/>
            <h2 className="text-3xl font-semibold text-orange-600">Login</h2>
            <form onSubmit={handleLogin} name="loginForm" className=" flex flex-wrap items-center justify-center gap-4 my-4">
              <div className="mb-5 w-full">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input onChange={handleInputChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nasir@example.com" required />
              </div>
              <div className="mb-5  w-full">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input onChange={handleInputChange} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>

              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            </form>
            <ul className="w-full flex flex-col gap-1">
              <li><button className="hover:scale-95 focus:scale-95 transition underline underline-offset-4">Login as Guest</button></li>
              <li><button className="cursor-text hover:scale-95 focus:scale-95 transition">Forgot Password? <Link to="/forgotPassword" className="underline underline-offset-4">Reset</Link></button></li>
              <li><button className="cursor-text hover:scale-95 focus:scale-95 transition">Don't have an account? <Link to="/register" className="underline underline-offset-4">Register</Link></button></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
