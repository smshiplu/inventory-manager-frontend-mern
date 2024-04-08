import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";


export const TableTrCard = ({product, index, handleDelete}) => {

  const { _id, name, category, price, quantity } = product;

  const shortenedName = (name, n) => {
    if(name.length > n) {
      return name.substring(0, n) + "...";
    } else {
      return name;
    }
  }

  return (
    <tr key={_id} className={`${ index % 2 === 0 ? "odd:bg-white odd:dark:bg-gray-600" : "even:bg-gray-50 even:dark:bg-gray-500"}  border-b dark:border-gray-600 hover:scale-95 focus:scale-95 transition-transform`}>
    <td  className="px-2 py-4">{index + 1}</td>
    <th scope="row" className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white line-clamp-1">{shortenedName(name, 18)}</th>
    <td className="px-6 py-3">{category}</td>
    <td className="p-3">${price}</td>
    <td className="p-3">{quantity}</td>
    <td className="p-3">${price * quantity}</td>
    <td className="px-6 py-3">
      <div className="flex items-center justify-evenly gap-3">
        <Link to={`/productDetail/${_id}`} className="hover:scale-95 focus:scale-95 transition-transform"><FaEye className="text-lg text-purple-600"/></Link>
        <Link to={`/editProduct/${_id}`} className="hover:scale-95 focus:scale-95 transition-transform"><FaEdit className="text-lg text-blue-600"/></Link>
        <button 
          onClick={() => {
            window.confirm("Are you sure to delete?") && handleDelete(_id);
          }} 
          className="hover:scale-95 focus:scale-95 transition-transform"><FaRegTrashAlt className="text-lg text-rose-600"/></button>
      </div>
    </td>
    </tr>
  )
}
