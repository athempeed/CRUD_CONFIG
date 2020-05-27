import fs, { readFile } from "fs";
import path from "path";

import { CondfigResopnseModel, MsgResopnseModel } from "../models";
import config from "../baeConfig";
import { response } from "express";

const msgResponse = new MsgResopnseModel();
const configResponse = new CondfigResopnseModel();
const configPath = path.join(config.PROJECT_DIR, "config", "config.json");
class ConfigService {
  constructor() {}

  createConfig(data, response) {
    console.log(configPath);
    fs.exists(configPath, (exists) => {
      if (exists) {
        msgResponse.status = 200;
        msgResponse.message = "File already exists.";
        console.log("exists", msgResponse);
        return response.status(msgResponse.status).json(msgResponse);
      } else {
        return fs.writeFile(configPath, JSON.stringify(data), () => {
          msgResponse.status = 200;
          msgResponse.message = "File created";
          return response.status(msgResponse.status).json(msgResponse);
        });
      }
    });
  }
  readConfig(response) {
    fs.exists(configPath, (exists) => {
      console.log("came here");
      if (!exists) {
        msgResponse.status = 404;
        msgResponse.message = "File not found.";
        console.log("exists", msgResponse);
        return response.status(msgResponse.status).json(msgResponse);
      } else {
        fs.readFile(configPath, (err, data) => {
          configResponse.status = 200;
          var result = data.toString().replace(/(\r\n|\n|\r)/gm, "");
          result = result.toString().replace(/['"]+/g, "'");
          configResponse.data = result;
          console.log(result);
          return response.status(configResponse.status).send(configResponse);
        });
      }
    });
  }

  updateConfig(data, response) {
    fs.exists(configPath, (exists) => {
      if (!exists) {
        msgResponse.status = 404;
        msgResponse.message = "File not found.";
        console.log("exists", msgResponse);
        return response.status(msgResponse.status).json(msgResponse);
      } else {
        fs.writeFile(configPath, JSON.stringify(data, null, 2), (err, data) => {
          this.readConfig(response);
        });
      }
    });
  }

  deleteConfig(response) {
    console.log("fs unline");
    fs.exists(configPath, (exists) => {
      if (!exists) {
        msgResponse.status = 404;
        msgResponse.message = "File not found.";
        return response.status(msgResponse.status).json(msgResponse);
      } else {
        fs.unlink(configPath, (err) => {
          console.log("fs unline:err", err);
          if (err) {
            msgResponse.status = 500;
            msgResponse.message = err.message;
          } else {
            msgResponse.status = 200;
            msgResponse.message = "File deleted successfully.";
          }
          return response.status(msgResponse.status).json(msgResponse);
        });
      }
    });
  }
}

const service = new ConfigService();
export default service;
