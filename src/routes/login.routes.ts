import { Router } from "express";
import createLoginController from "../controllers/login.controller";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { returnLoginSchema } from "../schemas/users.schema";
import { verifiActiveMiddleware } from "../middlewares/verify.middleware";

const loginRouter: Router = Router();

loginRouter.post(
  "",
  validateBodyMiddleware(returnLoginSchema),
  verifiActiveMiddleware,
  createLoginController
);

export default loginRouter;
