import { Request, Response, NextFunction } from "express";

import httpStatus from "http-status";

type AppError = Error & {
  type: string
}

export default function handleApplicationErrors(error: Error | AppError, req: Request, res: Response, next: NextFunction) {
  if (error.name === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({
      message: error.message,
    })
  }

  if (error.name === "DuplicateNameError") {
    return res.status(httpStatus.CONFLICT).send({
      message: error.message,
    })
  }

  if(error.name === "InsufficientBalanceError"){
    return res.status(httpStatus.BAD_REQUEST).send({
      message: error.message,
    })
  }

  if(error.name === "GameFinishedError"){
    return res.status(httpStatus.BAD_REQUEST).send({
      message: error.message,
    })
  }

  console.log(error);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR);
}