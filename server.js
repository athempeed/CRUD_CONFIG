import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import jsonwebtoken from "jsonwebtoken";
import path from "path";

import { MsgResopnseModel } from "./src/models";
import route from "./src/router";

const app = express();

dotenv.config();

const port = process.env.PORT;

/*------------------MiddleWare----------------------*/
app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0].toLocaleLowerCase() === "bearer"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      process.env.KEY,
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    res.user = undefined;
    next();
  }
});
app.use("/api", route());
/*------------------MiddleWare----------------------*/

//error in api
app.use((err, request, response, next) => {
  console.log("main", err);
  const status = err.status || 500;
  console.log("err.message", err.message);
  console.log("status", status);
  const n = new MsgResopnseModel(status, err.message);
  response.status(status).json(JSON.stringify(n));
});

app.listen(port, () => {
  console.log("server is running at PORT: ", port);
});
