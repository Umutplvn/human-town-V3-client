import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../features/authSlice";

const useAxios = () => {
  const { token } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  const axiosWithToken = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { Authorization:token },
  });

  const axiosPublic = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  // axiosWithToken.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     if (error?.response?.status === 401) {
  //       dispatch(logoutSuccess());
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  return { axiosWithToken, axiosPublic };
};

export default useAxios;
