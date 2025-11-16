import { useDispatch } from "react-redux";
import useAxios from "./useAxios";

import {
  fetchStart,
  fetchFail,
  getMailsSuccess,
  logoutDataSuccess,
  getSingleMailSuccess,
  getThreadSuccess,
} from "../features/dataSlice";

const useDataCall = () => {
  const dispatch = useDispatch();
  const { axiosWithToken, axiosPublic } = useAxios();

  // ---------------------------
  // 📌 GET MAILS (folder)
  // ---------------------------
  const getMails = async (folder = "inbox") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`/api/mails?folder=${folder}`);
      dispatch(getMailsSuccess({ folder, mails: data.mails }));
    } catch (err) {
      dispatch(fetchFail());
      console.log("GET MAILS ERROR:", err);
    }
  };

  // ---------------------------
  // 📌 GET SINGLE MAIL
  // ---------------------------
  const getMailById = async (mailId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`/api/mails/${mailId}`);
      dispatch(getSingleMailSuccess(data.mail));
    } catch (err) {
      dispatch(fetchFail());
    }
  };

  // ---------------------------
  // 📌 GET THREAD
  // ---------------------------
  const getThread = async (threadId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`/api/mails/thread/${threadId}`);
      dispatch(getThreadSuccess(data.mails));
    } catch (err) {
      dispatch(fetchFail());
    }
  };

  // ---------------------------
  // 📌 SEND MAIL
  // ---------------------------
  const sendMail = async (mailData) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`/api/mails/create`, mailData);
      getMails("sent");
    } catch (err) {
      dispatch(fetchFail());
    }
  };

  // ---------------------------
  // 📌 REPLY MAIL
  // ---------------------------
  const replyMail = async (replyData) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`/api/mails/reply`, replyData);
      getThread(replyData.threadId);
    } catch (err) {
      dispatch(fetchFail());
    }
  };

  // ---------------------------
  // 📌 FORWARD MAIL
  // ---------------------------
  const forwardMail = async (forwardData) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`/api/mails/forward`, forwardData);
      getMails("sent");
    } catch (err) {
      dispatch(fetchFail());
    }
  };

  // ---------------------------
  // 📌 DELETE MAIL (move to trash)
  // ---------------------------
  const deleteMail = async (mailId) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`/api/mails/delete/${mailId}`);
      getMails("trash");
    } catch (err) {
      dispatch(fetchFail());
    }
  };

  // ---------------------------
  // 📌 RESTORE MAIL
  // ---------------------------
  const restoreMail = async (mailId) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`/api/mails/restore/${mailId}`);
      getMails("inbox");
    } catch (err) {
      dispatch(fetchFail());
    }
  };

  // ---------------------------
  // 📌 DELETE BOTH SIDES
  // ---------------------------
  const deleteBothSides = async (mailId) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`/api/mails/${mailId}/both`);
      getMails("sent");
    } catch (err) {
      dispatch(fetchFail());
    }
  };

  // ---------------------------
  // 📌 LOGOUT → temizle
  // ---------------------------
  const logoutData = () => {
    dispatch(logoutDataSuccess());
  };

  return {
    getMails,
    getMailById,
    getThread,
    sendMail,
    replyMail,
    forwardMail,
    deleteMail,
    restoreMail,
    deleteBothSides,
    logoutData,
  };
};

export default useDataCall;
