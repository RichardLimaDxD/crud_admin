import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database";
import { QueryConfig, QueryResult } from "pg";
import { Tusers } from "../interfaces/users";
import { AppError } from "../error";
import { verify } from "jsonwebtoken";

const idExitsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(request.params.id);

  const queryString: string = `SELECT * FROM users WHERE id = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<Tusers> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  return next();
};

const emailExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { email }: { email: string } = request.body;
  if (email === undefined) return next();

  const queryTemplate: string = `SELECT * FROM "users" WHERE email = %L;`;

  const queryFormat: string = format(queryTemplate, email);

  const queryResult: QueryResult = await client.query(queryFormat);

  const foundUser: Tusers = queryResult.rows[0];

  if (foundUser !== undefined) {
    throw new AppError("E-mail already registered", 409);
  }
  return next();
};

const verifiActiveMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> => {
  const active: boolean = request.body.active;

  if (active === false) {
    throw new AppError("User not active", 400);
  }
  return next();
};

const validateTokenMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const authorization: string | undefined = request.headers.authorization;

  if (authorization === undefined) {
    throw new AppError("Missing Bearer Token", 401);
  }
  const [_bearer, token] = authorization.split(" ");

  verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    response.locals.admin = decoded.admin;
    response.locals.email = decoded.email;
    response.locals.id = parseInt(decoded.sub);
  });

  return next();
};

const verifiTokenPermissionMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const getToken = response.locals.admin;

  if (getToken !== true) {
    throw new AppError("Insufficient Permission", 403);
  }

  next();
};

const verifiUserIsAdminMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const getAdmin = response.locals.admin;

  const tokenId = response.locals.id;

  const paramsId = parseInt(request.params.id);

  if (!getAdmin && tokenId !== paramsId) {
    throw new AppError("Insufficient Permission", 403);
  }

  next();
};

const verifiUserIsOwnerTokenMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const tokenId = response.locals.id;

  const paramsId = parseInt(request.params.id);

  if (tokenId !== paramsId) {
    throw new AppError("Insufficient Permission", 403);
  }

  next();
};

const verifiAdminIsAdminMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const getAdmin = response.locals.admin;

  if (!getAdmin) {
    throw new AppError("Insufficient Permission", 403);
  }

  next();
};

export {
  idExitsMiddleware,
  emailExistsMiddleware,
  validateTokenMiddleware,
  verifiTokenPermissionMiddleware,
  verifiUserIsAdminMiddleware,
  verifiUserIsOwnerTokenMiddleware,
  verifiAdminIsAdminMiddleware,
  verifiActiveMiddleware,
};
