import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectCurrentlyShowing } from "../../../store/productSlice";


export const ProductSearch = ({searchTerm, setSearchTerm}) => {
  const currentlyShowing = useSelector(selectCurrentlyShowing);

  return (
    <div className="flex flex-wrap items-center md:justify-between justify-center gap-3">
      <h3 className="text-2xl dark:text-white">
        {currentlyShowing > 1 
          ? (<span>Displaying Items({currentlyShowing})</span>)
          : (<span>Displaying Item({currentlyShowing})</span>)
        }
      </h3>
      <form>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input onInput={e => setSearchTerm(e.target.value)} value={searchTerm} type="search" name="search" id="default-search" className="flex-1 flex p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by name" required />
        </div>
      </form>
    </div>
  )
}
