import apiClient from "./axiosClient";
import Nprogress from "nprogress";
export default {
  register(user) {
    Nprogress.start();
    return apiClient
      .post("/registers", {
        username: user.username,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phoneNo: user.phoneNo
      })
      .then((response) => {
        Nprogress.done();
        alert("Your account had been created, please wait for our admin to verify your admin. We will let you know via your email");
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        Nprogress.done();
        alert("The Email, or username was taken by other user");
        return Promise.reject(error);
      });
  },
  sendMail() {
    return apiClient
    .post("/send-mail",{
      email: localStorage.getItem("user").email
    }).then((response) => {
      alert(response.data)
    })
  }
};
