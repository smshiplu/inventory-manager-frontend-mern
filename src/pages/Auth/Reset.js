import { useState } from "react";
import { TbPasswordUser } from "react-icons/tb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../../components";
import { resetPassword } from "../../services";


export const Reset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if(!password || !confirmPassword) {
      return toast.error("Please fill in all required filed");
    }
    if(password.length < 6) {
      return toast.error("Password must be upto 6 characters ");
    }
    if(password !== confirmPassword) {
      return toast.error("Password didn't match");
    }

    const userData = {
      password
    }
    
    setIsLoading(true);
    try {
      const data = await resetPassword(userData, params.resetToken);
      e.target.reset();
      setIsLoading(false);
      toast.success(data.message);
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
      <main className="w-full min-h-dvh bg-blue-900">
        <div className="container max-w-screen-xl mx-auto p-4">
          <div className="flex items-center justify-center h-dvh">
            <div className="anim-bounce w-96 p-4 flex flex-col items-center justify-center  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <TbPasswordUser className="text-4xl text-gray-400"/>
              <h2 className="text-3xl font-semibold text-orange-600">Reset Password</h2>
              <form onSubmit={handleResetPassword} name="registrationForm" className="flex flex-wrap items-center justify-center gap-4 my-4">
                <div class="mb-5 w-full">
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password"  id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autoComplete="off" required />
                </div>
                <div class="mb-5 w-full">
                  <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input type="password" name="confirmPassword" id="confirmPassword" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autoComplete="off" required />
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset Password</button>
                {/* <input className="w-full p-2 border rounded" type="password" name="password" autoComplete="off" placeholder="New Password" required/>
                <input className="w-full p-2 border rounded" type="password" name="confirmPassword" autoComplete="off" placeholder="Confirm New Password" required/> 
                <button className="w-full p-2 bg-sky-500 text-white font-bold rounded hover:scale-95 focus:scale-95 transition">Reset Password</button> */}
              </form>
              <ul className="w-full flex flex-col gap-1">
                <li><button className="cursor-text hover:scale-95 focus:scale-95 transition"><Link to="/login" className="underline underline-offset-4">Login</Link>  using new password</button></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>

  )
}
