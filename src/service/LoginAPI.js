import apiClient from "./axiosClient";
import store from '@/store'
import Nprogress from "nprogress";
import router from '@/router';

export default {
  login(user) {
    Nprogress.start();
    return apiClient
      .post("/auth", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        store.dispatch('setCurrentUser', response.data.user)
        store.dispatch('setRole', response.data.user.authorities[0])
        store.dispatch('setStatus', response.data.user.status)
        Nprogress.done();
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        alert("incorrect username or password");
        Nprogress.done();
        return Promise.reject(error);
      });
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
    store.dispatch('setCurrentUser', null)
    store.dispatch('setRole', null)
    store.dispatch('setStatus', null)
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
};
