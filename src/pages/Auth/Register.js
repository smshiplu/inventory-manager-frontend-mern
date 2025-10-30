import { useState } from "react";
import { IoIosPersonAdd } from "react-icons/io";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { register, validateEmail } from "../../services";
import { useDispatch } from "react-redux";
// import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import { SET_LOGIN, SET_NAME } from "../../store/authSlice";
import { Loading } from "../../components";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if( !name || !email || !password || !confirmPassword ) {
      return toast.error("Please fill in all required fill");
    }

    if(!validateEmail(email)) {
      return toast.error("Enter a valid email")
    }

    if(password.length < 6) {
      return toast.error("Password must be upto 6 characters");
    }

    if(password !== confirmPassword) {
      return toast.error("Password didn't match");
    }
   
    const userData = {
      name, email, password
    }

    setIsLoading(true);

    try {
      const user = await register(userData);
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(user.name));
      e.target.reset();
      navigate("/dashboard");
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      toast.error(error.message)
    }
  }

  return (
    <>
    {isLoading && (
      <Loading />
    )}
    <main className="w-full bg-blue-900">
      <div className="container max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-center">
          <div className="anim-bounce w-96 p-4 mb-8 flex flex-col items-center justify-center  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <IoIosPersonAdd className="text-4xl text-gray-400"/>
            <h2 className="text-3xl font-semibold text-orange-600">Register</h2>
            <form onSubmit={handleRegister} name="registrationForm" className="flex flex-wrap items-center justify-center gap-4">
              <div className=" w-full">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nasir Uddin"  required autoComplete="off" />
              </div>

              <div className=" w-full">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nasir@example.com"  required autoComplete="off" />
              </div>
              <div className=" w-full">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required autoComplete="off" />
              </div>

              <div className=" w-full">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input type="password" name="confirmPassword" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required autoComplete="off" />
              </div>

              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
            </form>
            <ul className="w-full flex flex-col gap-1 text-gray-800 mt-4">
              <li><button className="cursor-text hover:scale-95 focus:scale-95 transition">Already have an account? <Link to="/login" className="underline underline-offset-4">Login</Link></button></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
