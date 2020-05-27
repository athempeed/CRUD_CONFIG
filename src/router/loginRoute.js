import express from "express";

import { LoginController } from "../controllers";

import loginService from "../services/loginService";

const router = express.Router();

const loginController = new LoginController(loginService);

module.exports = () => {
  // router.get("/", loginService.loginRequired, async (req, res, next) => {
  //   try {
  //     res.json("login method");
  //   } catch (err) {
  //     return next(err);
  //   }
  // });

  router.post("/", async (req, res, next) => {
    try {
      const result = loginController.Login(req.body);
      res.status(result.status).json(result);
    } catch (err) {
      return next(err);
    }
  });
  return router;
};
