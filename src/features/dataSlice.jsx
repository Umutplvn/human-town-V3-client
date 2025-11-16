import { createSlice } from "@reduxjs/toolkit";

export const mailSlice = createSlice({
  name: "mails",
  initialState: {
    loading: false,
    error: false,
    inbox: [],
    sent: [],
    trash: [],
    drafts: [],
    archives: [],
    spam: [],
  },

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },

    setFolderMails: (state, { payload }) => {
      const { folder, mails } = payload;
      state.loading = false;
      state.error = false;
      state[folder] = mails;
    },

    updateMailInFolder: (state, { payload }) => {
      const { folder, mail } = payload;
      state[folder] = state[folder].map((m) =>
        m._id === mail._id ? mail : m
      );
    },

    logoutAllData: (state) => {
      state.loading = false;
      state.error = false;
      state.inbox = [];
      state.sent = [];
      state.trash = [];
      state.drafts = [];
      state.archives = [];
      state.spam = [];
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  setFolderMails,
  updateMailInFolder,
  logoutAllData,
} = mailSlice.actions;

export default mailSlice.reducer;
