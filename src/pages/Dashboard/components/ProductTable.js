import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { LoadingTwo } from "../../../components";
import { TableTrCard } from "./TableTrCard";
import { useDispatch } from "react-redux";
import { CURRENTLY_SHOWING } from "../../../store/productSlice";


export const ProductTable = ({ products, isLoading, handleDelete }) => {
  
  const dispatch = useDispatch();
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;


  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.length > itemsPerPage ? products.slice(itemOffset, endOffset) : products;
  const pageCount = Math.ceil(products.length / itemsPerPage);

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
      <nav className="text-center my-10" aria-label="Page navigation example">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="flex items-center justify-center -space-x-px text-sm"
          pageLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          previousLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          nextLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          activeLinkClassName="flex items-center justify-center px-3 h-8 dark:bg-blue-800 bg-blue-800 text-white border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 font-medium"
        />
      </nav>
    </div>
  )
}
