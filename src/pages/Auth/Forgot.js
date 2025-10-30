import { useState } from "react";
import { IoMailOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword, validateEmail } from "../../services";
import { Loading } from "../../components";


export const Forgot = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if(!e.target.email.value) {
     return  toast.error("Please enter an email");
    }
    if(!validateEmail(e.target.email.value)) {
     return toast.error("Please enter an valid email");
    }
    const userData = {
      email: e.target.email.value
    }

    setIsLoading(true);
    try {
      await forgotPassword(userData);
      e.target.reset();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
    }
  }

  return (
    <>
    {isLoading && (
      <Loading />
    )}
    <main className="w-full bg-blue-900">
      <div className="container max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-center min-h-dvh">
          <div className="anim-bounce max-w-96 w-full p-4 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <IoMailOpenOutline className="text-4xl text-gray-400"/>
            <h2 className="text-3xl font-semibold text-orange-600">Forgot Password</h2>
            <form onSubmit={handleForgotPassword} name="forgotPasswordForm" className="flex flex-wrap items-center justify-center gap-4 my-4">
            {/* onChange={(e) => setEmail(e.target.value)} value={email}  */}
            <div className="mb-5 w-full">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nasir@example.com" autoComplete="off" required />
            </div>
            <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get Reset Email</button>
            </form>
            <ul className="w-full flex flex-col gap-1 text-gray-800">
              <li><button className="cursor-text hover:scale-95 focus:scale-95 transition">Already have an account? <Link to="/login" className="underline underline-offset-4">Login</Link></button></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
