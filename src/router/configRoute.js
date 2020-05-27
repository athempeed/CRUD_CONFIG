import express from "express";

import configService from "../services/configService";
import { ConfigController } from "../controllers";

const router = express.Router();
const configController = new ConfigController(configService);

module.exports = (params) => {
  router.get("/", async (req, res, next) => {
    try {
      configController.readConfig(res);
    } catch (err) {
      return next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      configController.createConfig(req.body, res);
    } catch (err) {
      return next(err);
    }
  });

  router.put("/", async (req, res, next) => {
    try {
      configController.updateConfig(req.body, res);
    } catch (err) {
      return next(err);
    }
  });

  router.delete("/", (req, res, next) => {
    try {
      configController.deleteConfig(res);
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
