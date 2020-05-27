import express from "express";

import login from "./loginRoute";
import config from "./configRoute";
import { MsgResopnseModel } from "../models/";
import loginService from "../services/loginService";

const router = express.Router();

const routeMethod = (params) => {
  router.get("/", async (req, res, next) => {
    try {
      var resp = new MsgResopnseModel(403, "not valid URl");
      res.status(403).json(resp);
    } catch (err) {
      return next(err);
    }
  });
  router.use("/login", login());
  router.use("/config", loginService.loginRequired, config());
  return router;
};

export default routeMethod;
