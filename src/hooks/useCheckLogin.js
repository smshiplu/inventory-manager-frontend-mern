import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { SET_LOGIN } from "../store/authSlice";
import { loginStatus } from "../services";

export const useCheckLogin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getStatus() {
      try {
        const status = await loginStatus();
        dispatch(SET_LOGIN(status));
       } catch (error) {
        toast.log(error.message);
       }
    }
    getStatus();
  }, [dispatch]);
}
