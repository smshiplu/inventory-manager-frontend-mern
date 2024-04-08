import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../store/authSlice";

export const ProtectedRoutesUnderLoggedIn = ({children}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  
  isLoggedIn 
  ? sessionStorage.setItem("pinvent-loggedIn", JSON.stringify(true))
  : sessionStorage.setItem("pinvent-loggedIn", JSON.stringify(false));

  const loggedStatus = JSON.parse(sessionStorage.getItem("pinvent-loggedIn"));
  return loggedStatus ? <Navigate to="/" /> : children;
}
