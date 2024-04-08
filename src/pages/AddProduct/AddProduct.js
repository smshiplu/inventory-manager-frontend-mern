import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { selectIsLoading, createProduct } from "../../redux/features/product/productSlice";
import { ComponentHeader, Loading, ProductForm, SidebarMenu } from "../../components";
import { createProduct } from "../../services";
import { toast } from "react-toastify";
import { ADD_PRODUCT, selectProducts } from "../../store/productSlice";


const initialState = {
  name: "",
  category: "",
  price: "",
  quantity: ""
}

export const AddProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  // const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const { name, category, price, quantity } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({...product, [name]: value}); 
  }

  const handleImageChange = (e) => {
    if(e.target.files[0]) {
      setProductImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  const generateSKU = (category) => {
    const letters = category.slice(0, 3).toUpperCase();
    const numbers = Date.now();
    const sku = letters + "-" + numbers;
    return sku;
  }

  const saveProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateSKU(category));
    formData.append("category", category);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("image", productImage);
    // console.log(...formData);

    setIsLoading(true);
    try {
      const data = await createProduct(formData);
      if(data) {
        dispatch(ADD_PRODUCT(data));
        
        // resets
        setProduct(initialState);
        setProductImage("");
        e.target.image.value = "";
        setImagePreview(null);
        setDescription("");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(data);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }

  return (
    <>
    {isLoading && (
      <Loading />
    )}
    <main>
      <ComponentHeader sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      <SidebarMenu sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      <div className={`p-4  ${sidebarToggle ? "md:ml-0 sm:ml-0" : "md:ml-64 sm:ml-64"}`}>
        <div className="w-full mx-auto min-h-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <h3 className="text-2xl font-semibold dark:text-white my-2">Add New Product</h3>
        <hr className="my-8 border border-gray-200 dark:border-gray-700 border-dashed" />
        <ProductForm 
          product={product}
          productImage={productImage}
          imagePreview={imagePreview}
          description={description}
          setDescription={setDescription}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          saveProduct={saveProduct}
        />
        </div>
      </div>
    </main>
    </>

  )
}
