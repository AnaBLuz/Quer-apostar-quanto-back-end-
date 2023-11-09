import express, { Request, Response, json } from "express";
import "express-async-errors";
import httpStatus from "http-status";

import handleApplicationErrors from "./middlewares/error-handling-middleware"

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => {
    res.status(httpStatus.OK).send("I'm ok!");
  });

app.use(handleApplicationErrors);

export default app;
