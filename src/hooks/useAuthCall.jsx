import { useDispatch } from "react-redux";
import {
  fetchStart,
  fetchFail,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  updateSuccess,
  // passwordUpdateSuccess,
} from "../features/authSlice";
import useAxios from "./useAxios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useAuthCall = () => {
  const navigate = useNavigate();
  const customErrorStyle = {
    backgroundColor: "#FCD8DC",
    color: "#A94442",
    textAlign: "center",
    borderRadius: "8px",
  };

  const dispatch = useDispatch();
  const { axiosWithToken, axiosPublic } = useAxios();

  // ---------------- LOGIN ----------------
  const login = async (body) => {
    dispatch(fetchStart());
    try {
      const res = await axiosPublic.post("/api/auth/login", body);
      dispatch(loginSuccess(res.data));
      navigate("/");
      return res.data;
    } catch (err) {
      dispatch(fetchFail());
      throw err;
    }
  };

  // ---------------- REGISTER ----------------
  const register = async (info) => {
    dispatch(fetchStart());
    try {
      const res = await axiosPublic.post("/api/admin/create", info);
      dispatch(registerSuccess(res.data));
      navigate("/");

      return res.data;
    } catch (err) {
      dispatch(fetchFail());
      const message =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Registration failed. Please try again.";
      console.log("Backend error message:", message);

      toast.error(message, {
        style: customErrorStyle,
      });
      throw err;
    }
  };

  // ---------------- LOGOUT ----------------
  const logout = async () => {
    dispatch(fetchStart());
    try {
      const res = await axiosWithToken.post("/api/auth/logout");
      dispatch(logoutSuccess());
      return res.data;
    } catch (err) {
      dispatch(fetchFail());
      throw err;
    }
  };

  // ---------------- UPDATE USER ----------------
  const updateUser = async (userId, body) => {
    dispatch(fetchStart());
    try {
      const res = await axiosWithToken.put(`/api/admin/${userId}`, body);
      dispatch(updateSuccess(res.data));
      return res.data;
    } catch (err) {
      dispatch(fetchFail());
      throw err;
    }
  };

  // // ---------------- UPDATE PASSWORD ----------------
  // const updatePassword = async (userId, body) => {
  //   dispatch(fetchStart());
  //   try {
  //     const res = await axiosWithToken.put(`/api/admin/${userId}`, body);
  //     dispatch(passwordUpdateSuccess(res.data));
  //     return res.data;
  //   } catch (err) {
  //     dispatch(fetchFail());
  //     throw err;
  //   }
  // };

  return { login, register, logout, updateUser };
};

export default useAuthCall;
