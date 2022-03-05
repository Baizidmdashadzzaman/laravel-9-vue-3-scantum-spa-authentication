import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async register(form) {
    await Csrf.getCookie();
    return Api.post("/api/register", form);
  },

  async login(form) {
    await Csrf.getCookie();
    return Api.post("/api/login", form);
  },

  async logout() {
    await Csrf.getCookie();
    return Api.get("/api/logout");
  },

  auth() {
    return Api.get("/api/user");
  }
};