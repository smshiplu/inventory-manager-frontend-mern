import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import { FaArrowRight } from "react-icons/fa";


import { ComponentHeader, LoadingTwo, SidebarMenu } from "../../components";
import { getProduct } from "../../services";
import { SET_GET_PRODUCT, selectProduct } from "../../store/productSlice";
import { selectMenuToggle } from "../../store/btnSlice";


export const ProductDetail = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const menuToggle = useSelector(selectMenuToggle);
  const product = useSelector(selectProduct);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { name, sku, category, price, quantity, description, image, createdAt, updatedAt } = product;

  const getSingleProduct = async () => {
    setIsLoading(true);
    try {
      const data = await getProduct(id);
      setIsLoading(false);
      dispatch(SET_GET_PRODUCT(data));
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
    }
  }
  useEffect(() => {
    getSingleProduct();
  }, []); //eslint-disable-line


  return (
    <main>
      <ComponentHeader
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle} 
      />
      <SidebarMenu
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle} 
      />

      <section className={`p-4  ${menuToggle ? "md:ml-0 sm:ml-0" : "md:ml-64 sm:ml-64"}`}>
        <div className="w-full mx-auto min-h-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h3 className="text-2xl font-semibold dark:text-white my-2">Product Detail</h3>
          <hr className="my-8 border border-gray-200 dark:border-gray-700 border-dashed" />
          {isLoading && (
            <LoadingTwo/>
          )}
          {product && (
            <div className=" flex items-center justify-center">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div>
                {product?.image 
                ? (<img className="rounded-t-lg" src={`${process.env.NODE_ENV === "development" ? (process.env.REACT_APP_BACKEND_URL + "/" + image?.filePath) : (image?.filePath)}`} alt={name} />)
                : <p className="my-3 font-normal text-center text-gray-700 dark:text-gray-400">No image set for this product</p>
                }
              </div>
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                <hr />
                <ul className="my-4 flex flex-col gap-3 text-gray-800 dark:text-white">
                  <li className="flex items-center gap-2"><FaArrowRight /><span className="font-bold">Availability :</span> 
                  {quantity < 1 
                    ? (<code className="bg-gray-300 px-2 rounded font-medium text-rose-700 text-lg">Stock Out</code>)
                    : (<code className="bg-gray-300 px-2 rounded font-medium text-green-700 text-lg">In Stock</code>)
                  }
                  </li>
                  <li className="flex items-center gap-2"><FaArrowRight /><span className="font-bold">SKU :</span> <span className="text-gray-700 dark:text-gray-400">{sku}</span></li>
                  <li className="flex items-center gap-2"><FaArrowRight /><span className="font-bold">Category :</span> <span className="text-gray-700 dark:text-gray-400">{category}</span></li>
                  <li className="flex items-center gap-2"><FaArrowRight /><span className="font-bold">Price :</span> <span className="text-gray-700 dark:text-gray-400">${price}</span></li>
                  <li className="flex items-center gap-2"><FaArrowRight /><span className="font-bold">Quantity in stock :</span> <span className="text-gray-700 dark:text-gray-400">{quantity}</span></li>
                  <li className="flex items-center gap-2"><FaArrowRight /><span className="font-bold">Total value in stock :</span> <span className="text-gray-700 dark:text-gray-400">${quantity * price}</span></li>
                </ul>
                <hr />
                <div className="my-3">
                  <div className="flex items-center gap-2 mb-2"><FaArrowRight /><span className="font-bold">Description :</span></div>
                  <div className="font-normal text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}}></div>
                </div>
                <hr />
                <div className="mt-3 flex flex-col text-xs text-gray-700 dark:text-gray-400">
                  <code>Created on : {createdAt}</code>
                  <code>Last updated : {updatedAt}</code>
                </div>
                
              </div>
            </div>
          </div>
          )}
          

        </div>
      </section>
    </main>
  )
}
