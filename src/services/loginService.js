import Jwt from "jsonwebtoken";
import { LoginResopnseModel, MsgResopnseModel } from "../models";

class LoginService {
  constructor() {}

  Login(params) {
    const { username, password } = params;
    if (username == "admin" && password == "admin") {
      const token = Jwt.sign({ username: username }, process.env.KEY);
      const d = new LoginResopnseModel(200, "Login successful", token);
      return d;
    } else {
      return new LoginResopnseModel(401, "Login Unauthorized");
    }
  }

  loginRequired(req, res, next) {
    if (req.user) {
      next();
    } else {
      let resp = new LoginResopnseModel(401, "Login Unauthorized");
      res.status(403).send(resp);
    }
  }
}

const service = new LoginService();
export default service;
