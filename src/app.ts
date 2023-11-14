import express, { Request, Response, json } from "express";
import "express-async-errors";
import httpStatus from "http-status";
import { participantsRouter, gameRouter, betsRouter } from "./routers/index";

import handleApplicationErrors from "./middlewares/error-handling-middleware"

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => {
    res.status(httpStatus.OK).send("I'm ok!");
  });
app.use(participantsRouter);
app.use(gameRouter);
app.use(betsRouter);

app.use(handleApplicationErrors);

export default app;
