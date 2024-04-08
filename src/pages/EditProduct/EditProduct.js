import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { updateProduct, getProduct } from "../../services";
import { ComponentHeader, SidebarMenu, Loading, ProductForm } from "../../components";
import { selectMenuToggle } from "../../store/btnSlice";

export const EditProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const menuToggle = useSelector(selectMenuToggle);

  const [product, setProduct] = useState({});

  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getProductById = async () => {
      setIsLoading(true);
      try {
        const data = await getProduct(id);
        setIsLoading(false);
        setProduct(data);
      } catch (error) {
        setIsLoading(false);
        toast.error(error);
      }
    }
    getProductById();
  }, []) //eslint-disable-line

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

  useEffect(() => {
    if(product && product.image) {
      setImagePreview(
        process.env.NODE_ENV === "development"
        ? (process.env.REACT_APP_BACKEND_URL + "/" + product?.image?.filePath)
        : (product?.image?.filePath)
      )
    } else {
      setImagePreview(null)
    }

    if(product && product.description) {
      setDescription(product?.description)
    }
  }, [product]); //eslint-disable-line



  const saveProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("price", product?.price);
    formData.append("quantity", product?.quantity);
    formData.append("description", description);
    if(productImage) {
      formData.append("image", productImage);
    }

    await updateProduct(id, formData);
    navigate("/dashboard");
  }

  return (
    <main>
      {isLoading && (
        <Loading/>
      )}
      <ComponentHeader />
      <SidebarMenu />
      <section className={`p-4  ${menuToggle ? "md:ml-0 sm:ml-0" : "md:ml-64 sm:ml-64"}`}>
        <div className="w-full mx-auto min-h-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h3 className="text-2xl font-semibold dark:text-white my-2">Edit Product</h3>
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
      </section>
    </main>
  )
}
