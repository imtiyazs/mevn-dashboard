import {
  setCurrentUser,
  getCurrentUser,
  setUserToken,
  removeUserToken
} from "../../utils";
import axios from "axios";

export default {
  state: {
    currentUser: getCurrentUser(),
    loginError: null,
    processing: false
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload;
      state.processing = false;
      state.loginError = null;
    },
    setLogout(state) {
      state.currentUser = null;
      state.processing = false;
      state.loginError = null;
    },
    setProcessing(state, payload) {
      state.processing = payload;
      state.loginError = null;
    },
    setError(state, payload) {
      state.loginError = payload;
      state.currentUser = null;
      state.processing = false;
    },
    clearError(state) {
      state.loginError = null;
    }
  },
  actions: {
    async login({ commit }, payload) {
      try {
        commit("clearError");
        commit("setProcessing", true);
        const res = await axios.post("/v1/auth/login", payload);
        setUserToken(res.data.tokens.access.token);
        setCurrentUser(res.data.user);
        commit("setUser", res.data.user);
        commit("setProcessing", false);
      } catch (e) {
        console.error(e);
        commit("setProcessing", false);
        commit("setError", e.response.data.message);
      }
    },

    async glogin({ commit }, payload) {
      try {
        commit("clearError");
        commit("setProcessing", true);
        const res = await axios.post("/v1/auth/glogin", payload);
        setUserToken(res.data.tokens.access.token);
        setCurrentUser(res.data.user);
        commit("setUser", res.data.user);
        commit("setProcessing", false);
      } catch (e) {
        console.error(e);
        commit("setProcessing", false);
        commit("setError", e.response.data.message);
      }
    },

    async register({ commit }, payload) {
      try {
        commit("clearError");
        commit("setProcessing", true);
        await axios.post("/v1/auth/register", payload);
        commit("setProcessing", false);
      } catch (e) {
        console.error(e);
        commit("setProcessing", false);
        commit("setError", e.response.data.message);
      }
    },

    signOut({ commit }) {
      setCurrentUser(null);
      removeUserToken();
      commit("setLogout");
    }
  }
};
