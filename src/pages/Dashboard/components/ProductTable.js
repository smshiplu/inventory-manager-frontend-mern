import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { LoadingTwo } from "../../../components";
import { TableTrCard } from "./TableTrCard";
import { useDispatch, useSelector } from "react-redux";
import { CURRENTLY_SHOWING } from "../../../store/productSlice";
import { SET_ITEMS_PER_PAGE, selectItemsPerPage } from "../../../store/btnSlice";

export const ProductTable = ({ products, isLoading, handleDelete }) => {

  const dispatch = useDispatch();
  const itemsPerPage = useSelector(selectItemsPerPage);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const tempItems = products.length > itemsPerPage ? products.slice(itemOffset, endOffset) : products;
    setCurrentItems([...tempItems]);
    const tempCount = Math.ceil(products.length / itemsPerPage);
    setPageCount(tempCount)
  }, [itemOffset, itemsPerPage, pageCount, products]);
  

  useEffect(() => {
    dispatch(CURRENTLY_SHOWING(currentItems.length));
  }, [dispatch, currentItems]); 

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  }

  return (
    <div>
      <div className="relative min-h-56 overflow-x-auto my-6 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 font-bold uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3 ">
                s/n
              </th>
              <th scope="col" className="px-6 py-3 ">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="p-3">
                Price
              </th>
              <th scope="col" className="p-3">
                Quantity
              </th>
              <th scope="col" className="p-3">
                Value
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (<tr><td colSpan="7"><LoadingTwo/></td></tr>)}

            {!isLoading && currentItems.length < 1 
            ? (<tr><td colSpan="7" className="p-4 text-center">No product found, please add product.</td></tr>)
            : (currentItems.map((product, index) => (
              <TableTrCard key={product._id} product={product} index={index} handleDelete={handleDelete}/>
            )))}
          </tbody>
        </table>
      </div>
      <hr className="my-8 border border-gray-200 dark:border-gray-700 border-dashed" />
      <div className="flex flex-wrap gap-5 items-end justify-between my-10">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Items per page</label>
          <input onChange={ e => e.target.value < 5 ? dispatch(SET_ITEMS_PER_PAGE(5)) : dispatch(SET_ITEMS_PER_PAGE(e.target.value)) } defaultValue={itemsPerPage} min={5} minLength={3} name="itemsPerPage" type="number" id="displayItem" className="w-[100px] p-1 text-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autoComplete="off" />
        </div>
        <nav aria-label="Page navigation example">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            containerClassName="flex items-center justify-center -space-x-px text-sm"
            pageLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            previousLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            nextLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            activeLinkClassName="flex items-center justify-center px-3 h-8 bg-blue-900  dark:bg-blue-900 text-white border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 font-medium"
          />
        </nav>
      </div>      
    </div>
  )
}
