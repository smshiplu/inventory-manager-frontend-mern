import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { ComponentHeader, Loading, SidebarMenu } from "../../components";

import { getUser, updateUser } from "../../services";
import { SET_USER, selectUser } from "../../store/authSlice";
import { selectMenuToggle } from "../../store/btnSlice";

import UserPlaceholderImg from "../../assets/user-placeholder.jpg";

export const EditProfile = () => {
  const dispatch = useDispatch();
  const menuToggle = useSelector(selectMenuToggle);
  const userRx = useSelector(selectUser);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(userRx);
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if(!userRx.email) {
      async function getUserProfile() {
        setIsLoading(true);
        try {
          const userData = await getUser();
          setUser(userData.data);
          dispatch(SET_USER(userData));
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          toast.error(error.message);
        }
      } 
      getUserProfile();
    } else {
      setUser(userRx);
    }
  }, [dispatch, userRx]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({...user, [name]: value});
  }

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
    setPhotoPreview(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    if(user && user.photo) {
      setPhotoPreview(user?.photo) 
    } else {
      setPhotoPreview(null);
    }
  }, [user]);

  const saveProfile = async (e) => {
    e.preventDefault();
    
    // Handle image upload
    setIsLoading(true);
    try {
      let imgUrl;
      if( photo && 
          (photo.type === "image/png" ||
          photo.type === "image/jpg" ||
          photo.type === "image/jpeg") ) 
      {
          const image = new FormData();
          image.append("file", photo);
          image.append("cloud_name", "dvp51ew3h");
          image.append("upload_preset", "yqscqzu6");
          const requestOptions = {
            method: "POST",
            body: image
          }
          // Save image to cloudinary
          const response  = await fetch("https://api.cloudinary.com/v1_1/dvp51ew3h/image/upload", requestOptions);
          const imgData = await response.json();
          console.log(imgData);
          imgUrl = imgData.url.toString();
          
      }

      // Save data to DB
      const formData = {
        name: user.name,
        phone: user.phone,
        bio: user.bio,
        photo: photo ? imgUrl : user.photo
      }
      await updateUser(formData);
      setIsLoading(false);
      toast.success("User updated successfully");
      navigate("/userProfile");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
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
          <h3 className="text-2xl font-semibold dark:text-white my-2">Edit Profile</h3>
          <hr className="my-8 border border-gray-200 dark:border-gray-700 border-dashed" />

          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 my-3 rounded-full shadow-lg" src={`${ photoPreview ? photoPreview : UserPlaceholderImg}`} alt={user?.name} />
                <form onSubmit={saveProfile} className="p-4">
                  <div className="mb-5 rounded-lg">
                    <label className="block text-sm  mb-2 font-medium text-gray-900 dark:text-white" htmlFor="image">Photo</label>
                    <input onChange={e => handlePhotoChange(e)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" aria-describedby="user_avatar_help" id="image" name="image" type="file" />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input onChange={ e => handleInputChange(e) } value={user?.name || ""} type="text" id="name" name="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" autoComplete="off" required />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input onChange={ e => handleInputChange(e) } value={user?.email || ""} type="email" id="email" name="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:disabled:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light cursor-not-allowed" autoComplete="off" required disabled/>
                    <code className="text-xs">Email cannot be changed!</code>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                    <input onChange={ e => handleInputChange(e) } value={user?.phone || ""} type="text" id="phone" name="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" autoComplete="off" />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
                    <textarea onChange={ e => handleInputChange(e) } value={user?.bio || ""} id="bio" name="bio" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" autoComplete="off"></textarea>
                  </div>
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Changes</button>
                </form>
                
                
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </main> 

  )
}
