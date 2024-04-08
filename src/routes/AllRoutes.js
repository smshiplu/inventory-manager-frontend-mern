import { Routes, Route } from "react-router-dom";
import { 
  Home, 
  Register, 
  Login, 
  Forgot, 
  Reset, 
  Dashboard, 
  PageNotFound, 
  AddProduct,
  ProductDetail,
  EditProduct,
  UserProfile,
  EditProfile,
  ChangePassword,
  Contact } from "../pages";

import { ProtectedRoutes } from "./ProtectedRoutes";
import { ProtectedRoutesUnderLoggedIn } from "./ProtectedRoutesUnderLoggedIn";


export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />

      <Route path="register" element={<ProtectedRoutesUnderLoggedIn> <Register /> </ProtectedRoutesUnderLoggedIn>} />
      <Route path="login" element={<ProtectedRoutesUnderLoggedIn> <Login />  </ProtectedRoutesUnderLoggedIn> } />
      <Route path="forgotPassword" element={<ProtectedRoutesUnderLoggedIn> <Forgot /> </ProtectedRoutesUnderLoggedIn>  } />
      <Route path="resetPassword/:resetToken" element={<ProtectedRoutesUnderLoggedIn> <Reset /> </ProtectedRoutesUnderLoggedIn>  } />

      <Route path="dashboard" element={<ProtectedRoutes> <Dashboard /> </ProtectedRoutes> } />
      <Route path="addProduct" element={<ProtectedRoutes> <AddProduct /> </ProtectedRoutes> } />
      <Route path="productDetail/:id" element={<ProtectedRoutes> <ProductDetail /> </ProtectedRoutes> } />
      <Route path="editProduct/:id" element={<ProtectedRoutes> <EditProduct /> </ProtectedRoutes> } />
      <Route path="userProfile" element={<ProtectedRoutes> <UserProfile /> </ProtectedRoutes> } />
      <Route path="editProfile" element={<ProtectedRoutes> <EditProfile /> </ProtectedRoutes> } />
      <Route path="changePassword" element={<ProtectedRoutes> <ChangePassword /> </ProtectedRoutes> } />
      <Route path="contact" element={<ProtectedRoutes> <Contact /> </ProtectedRoutes> } />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
