import { TbShoppingCartCopy } from "react-icons/tb";
import { TbShoppingCartOff } from "react-icons/tb";
import { TbShoppingCartDown } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { useSelector } from "react-redux";

import { 
  selectStoreValue, 
  selectStockOut, 
  selectStockLow, 
  selectTotalCategory, 
  selectTotalProduct } from "../../../store/productSlice";

export const Stats = () => {

  const storeValue = useSelector(selectStoreValue);
  const stockOut = useSelector(selectStockOut);
  const stockLow = useSelector(selectStockLow);
  const totalCategory = useSelector(selectTotalCategory);
  const totalProduct = useSelector(selectTotalProduct);

  function formateNumbers(n) {
    return String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,');
  }

  return (
    <div>
      <h3 className="text-2xl dark:text-white md:text-left text-center mt-2 mb-4">Inventory Stats</h3>
      <div className="flex flex-wrap items-center justify-center gap-2">
        
        <div className="flex items-center justify-center gap-2 w-48 h-20 p-2 bg-purple-600 text-white border border-gray-200 rounded-lg shadow hover:bg-purple-500 hover:scale-95 focus:scale-95 transition">
          <TbShoppingCartCopy className="inline-block md:w-8 md:h-8 w-6 h-6" />
          <div>
            <p>Total Product</p>
            <p className="text-xl font-semibold">{totalProduct}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 w-48 h-20 p-2 bg-pink-600 text-white border border-gray-200 rounded-lg shadow hover:bg-pink-500  hover:scale-95 focus:scale-95 transition">
          <TbShoppingCartDown className="inline-block md:w-8 md:h-8 w-6 h-6" />
          <div>
            <p>Low in Stock</p>
            <p className="text-xl font-semibold">{stockLow}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 w-48 h-20 p-2 bg-rose-600 text-white border border-gray-200 rounded-lg shadow hover:bg-rose-500 hover:scale-95 focus:scale-95 transition">
          <TbShoppingCartOff className="inline-block md:w-8 md:h-8 w-6 h-6" />
          <div>
            <p>Out of Stock</p>
            <p className="text-xl font-semibold">{stockOut}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 w-48 h-20 p-2 bg-cyan-600 text-white border border-gray-200 rounded-lg shadow hover:bg-cyan-500 hover:scale-95 focus:scale-95 transition">
          <MdOutlineCategory className="inline-block md:w-8 md:h-8 w-6 h-6" />
          <div>
            <p>All Categories</p>
            <p className="text-xl font-semibold">{totalCategory}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 w-48 h-20 p-2 bg-green-600 text-white border border-gray-200 rounded-lg shadow hover:bg-green-500 hover:scale-95 focus:scale-95 transition">
          <GiTakeMyMoney className="inline-block md:w-8 md:h-8 w-6 h-6" />
          <div>
            <p>Total Store Value</p>
            <p className="text-xl font-semibold">{`$${formateNumbers(storeValue.toFixed(2))}`}</p>
          </div>
        </div>
      </div>
    </div>
    
  )
}
