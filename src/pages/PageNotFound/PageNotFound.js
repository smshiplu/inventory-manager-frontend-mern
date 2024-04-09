import { Link } from "react-router-dom";
import Image404 from "../../assets/page-not-found.svg";

export const PageNotFound = () => {
  return (
    <main>
      <section className="w-full min-h-screen">
        <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 class="text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Error 404, Page not found!</h1>
          <img src={Image404} alt="page not found" className="w-1/2 mx-auto" />
          <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <Link to="/" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 hover:scale-95 focus:scale-95 transition">
              Back Home
              <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
