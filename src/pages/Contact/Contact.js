import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { ComponentHeader, Loading, SidebarMenu } from "../../components"
import { selectMenuToggle } from "../../store/btnSlice"
import { contactUs } from "../../services";

const initialState = {
  subject: "",
  message: ""
}

export const Contact = () => {
  const menuToggle = useSelector(selectMenuToggle);
  const [formData, setFormData] = useState({...initialState});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  }

  const sendEmail = async (e) => {
    e.preventDefault();
    if(!formData.subject || !formData.message) {
      return toast.error("Fill in all required fields");
    }
    setIsLoading(true);
    try {
      await contactUs(formData);
      e.target.reset();
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <main>
      {isLoading && (
        <Loading />
      )}
      <ComponentHeader />
      <SidebarMenu />
      <section className={`p-4  ${menuToggle ? "md:ml-0 sm:ml-0" : "md:ml-64 sm:ml-64"}`}>
        <div className="w-full mx-auto min-h-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h3 className="text-2xl font-semibold dark:text-white my-2">Contact Us</h3>
          <hr className="my-8 w-full mx-auto  border border-gray-200 dark:border-gray-700 border-dashed border-spacing-x-10" />

          <section className="">
            <div className="py-8  mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
              <div className="flex flex-col justify-center">
                
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">We are very sorry about the unexpected user experience. You may let us know about the bugs. We'll reply you asap.</p>
                <a href="#\" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Read more about our app 
                  <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </a>
              </div>
              <div>
                <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Send an email</h3>
                  <form onSubmit={sendEmail} className="mt-8 space-y-6">
                    <div>
                      <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                      <input onChange={handleInputChange}  type="text" name="subject" id="subject" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write the subject of the email" autoComplete="off" required />
                    </div>
                    <div>
                      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
                      <textarea onChange={handleInputChange} name="message" id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." autoComplete="off" required></textarea>
                    </div>
                    <button type="submit" className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:scale-95 focus:scale-95 transition">Send</button>
                  </form>
                </div>
              </div>
            </div>
          </section>



        </div>
      </section>
    </main>
  )
}
