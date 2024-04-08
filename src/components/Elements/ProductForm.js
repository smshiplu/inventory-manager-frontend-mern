import JoditEditor from 'jodit-react';
import { useRef } from 'react';


export const ProductForm = ({ product, productImage, imagePreview, description, setDescription, handleInputChange, handleImageChange, saveProduct}) => {

  const editor = useRef();

  return (
    <form onSubmit={saveProduct} className="max-w-sm mx-auto">
    <div className="mb-5 border border-gray-300 p-2 rounded-lg">
      <label className="block text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">Product Image</label>
      <code className="block mb-3 text-xs text-gray-900 dark:text-white">Supported formats: png, jpg, jpeg</code>
      <input onChange={e => handleImageChange(e)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" aria-describedby="user_avatar_help" id="image" name="image" type="file" />
      {imagePreview != null 
      ? (<div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">
        <img src={imagePreview} alt="image" className='w-full' />
      </div>) 
      : (<div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">No image set for this product</div>)}

    </div>
    <div className="mb-5">
      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
      <input onChange={e => handleInputChange(e)} value={product?.name || ""} type="text" id="name" name="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" autoComplete="off" required />
    </div>
    <div className="mb-5">
      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Category</label>
      <input onChange={ e => handleInputChange(e)} value={product?.category || ""} type="text" id="category" name="category" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" autoComplete="off" required />
    </div>
    <div className="mb-5">
      <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price</label>
      <input onChange={ e => handleInputChange(e)} value={product?.price || ""} type="number" id="price" name="price" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
    </div>
    <div className="mb-5">
      <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Quantity</label>
      <input onChange={ e => handleInputChange(e)} value={product?.quantity || ""} type="number" id="quantity" name="quantity" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
    </div>
    <div className="mb-5">
      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
      {/* <textarea id="description" name="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autoComplete="off"></textarea> */}
      
      {/* <ReactQuill theme="snow" value={description} onChange={setDescription} modules={ProductForm.modules} formats={ProductForm.formats} /> */}

      <JoditEditor
        style={{borderRadius: "50px"}}
        ref={editor}
        tabIndex={1} 
        value={`${description}`}
        onChange={setDescription}
		  />
    </div>

    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Product</button>
    </form>
  )
}

