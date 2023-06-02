import { Router } from "express";
import {
  createUsersController,
  deleteUserController,
  editUserController,
  getAllUsersController,
  getProfileController,
  putAdminControlle,
} from "../controllers/users.controller";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { updateUserSchema, userCreateSchema } from "../schemas/users.schema";
import {
  idExitsMiddleware,
  emailExistsMiddleware,
  validateTokenMiddleware,
  verifiTokenPermissionMiddleware,
  verifiUserIsAdminMiddleware,
  verifiUserIsOwnerTokenMiddleware,
  verifiAdminIsAdminMiddleware,
} from "../middlewares/verify.middleware";

const usersRouter: Router = Router();

usersRouter.post(
  "",
  validateBodyMiddleware(userCreateSchema),
  emailExistsMiddleware,
  createUsersController
);

usersRouter.get(
  "",
  validateTokenMiddleware,
  verifiTokenPermissionMiddleware,
  getAllUsersController
);

usersRouter.get("/profile", validateTokenMiddleware, getProfileController);

usersRouter.patch(
  "/:id",
  validateTokenMiddleware,
  idExitsMiddleware,
  validateBodyMiddleware(updateUserSchema),
  verifiUserIsAdminMiddleware,
  emailExistsMiddleware,
  editUserController
);

usersRouter.delete(
  "/:id",
  validateTokenMiddleware,
  idExitsMiddleware,
  verifiUserIsAdminMiddleware,
  deleteUserController
);

usersRouter.put(
  "/:id/recover",
  validateTokenMiddleware,
  verifiAdminIsAdminMiddleware,
  idExitsMiddleware,
  putAdminControlle
);

export default usersRouter;
