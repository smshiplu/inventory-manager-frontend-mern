import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { SidebarMenu } from "../../components";
import { ComponentHeader } from "../../components";

import { Stats } from "./components/Stats";
import { ProductTable } from "./components/ProductTable";
import { ProductSearch } from "./components/ProductSearch";

import { getAllProducts, deleteProduct } from "../../services";
import { GET_ALL_PRODUCTS, SEARCH_PRODUCTS, SET_PRODUCTS_FOR_STAT, selectProducts, selectSearchedProducts} from "../../store/productSlice";
import { selectMenuToggle } from "../../store/btnSlice";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const menuToggle = useSelector(selectMenuToggle);
  const products = useSelector(selectProducts);
  const searchedProducts = useSelector(selectSearchedProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const getProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProducts();
      setIsLoading(false);
      dispatch(GET_ALL_PRODUCTS(data));
      dispatch(SET_PRODUCTS_FOR_STAT(data));
    } catch (error) {
      setIsLoading(false);
      toast.error(error)
    }
  }
  useEffect(() => {
    getProducts();
  }, []); //eslint-disable-line

  useEffect(() => {
    dispatch(SEARCH_PRODUCTS(searchTerm));
  }, [dispatch, searchTerm]);    

  useEffect(() => {
    if(searchTerm.length > 0 && searchedProducts.length > 0) {
      dispatch(GET_ALL_PRODUCTS([...searchedProducts]));
    } else if(searchTerm.length && searchedProducts.length === 0) {
      dispatch(GET_ALL_PRODUCTS([]));
    } else {
      getProducts();
    }
  }, [dispatch, searchTerm, searchedProducts]); //eslint-disable-line
  

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await deleteProduct(id);
      await getProducts();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
    }
  }

  return (
    <main>
      <ComponentHeader />
      <SidebarMenu />

      <section className={`p-4  ${menuToggle ? "md:ml-0 sm:ml-0" : "md:ml-64 sm:ml-64"}`}>
        <div className="w-full mx-auto min-h-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Stats />
          <hr className="my-8 border-2 border-gray-200 dark:border-gray-700 border-dashed" />
          <ProductSearch 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          <ProductTable 
            products={products}
            isLoading={isLoading} 
            handleDelete={handleDelete}
          />
        </div>
      </section>
    </main>
  )
}
