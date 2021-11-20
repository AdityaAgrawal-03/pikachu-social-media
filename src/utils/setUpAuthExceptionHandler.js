import axios from "axios";
import { logout } from "../features/index"

export const setUpAuthExceptionHandler = (dispatch) => {
  const UNAUTHORIZED = 401;
  const FORBIDDEN = 400;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error?.response?.status, "here")
      if (error?.response?.status === UNAUTHORIZED || error?.response?.status === FORBIDDEN) {
        console.log("here")
        dispatch(logout());
      }
      return Promise.reject(error);
    }
  )
}