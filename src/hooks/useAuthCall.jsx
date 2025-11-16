import { useDispatch } from "react-redux";
import { fetchStart, fetchFail, loginSuccess, logoutSuccess, registerSuccess, updateSuccess, passwordUpdateSuccess } from "../redux/authSlice";
import useAxios from "./useAxios";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const { axiosWithToken, axiosPublic } = useAxios();

  // ---------------- LOGIN ----------------
  const login = async (body) => {
    dispatch(fetchStart());
    try {
      const res = await axiosPublic.post("/api/auth/login", body);
      dispatch(loginSuccess(res.data));
      return res.data;
    } catch (err) {
      dispatch(fetchFail());
      throw err;
    }
  };

  // ---------------- REGISTER ----------------
  const register = async (body) => {
    dispatch(fetchStart());
    try {
      const res = await axiosPublic.post("/api/admin/create", body);
      dispatch(registerSuccess(res.data));
      return res.data;
    } catch (err) {
      dispatch(fetchFail());
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

  // ---------------- UPDATE PASSWORD ----------------
  const updatePassword = async (userId, body) => {
    dispatch(fetchStart());
    try {
      const res = await axiosWithToken.put(`/api/admin/${userId}`, body);
      dispatch(passwordUpdateSuccess(res.data));
      return res.data;
    } catch (err) {
      dispatch(fetchFail());
      throw err;
    }
  };

  return { login, register, logout, updateUser, updatePassword };
};

export default useAuthCall;
