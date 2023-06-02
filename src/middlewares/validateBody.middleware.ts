import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const validateBodyMiddleware =
  (schema: ZodTypeAny) =>
  (
    request: Request,
    response: Response,
    next: NextFunction
  ): Response | void => {
    const validated = schema.parse(request.body);
    request.body = validated;

    return next();
  };

export { validateBodyMiddleware };
