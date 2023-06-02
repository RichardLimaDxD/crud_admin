import { Request, Response } from "express";
import {
  TeditRequest,
  TuserResponse,
  TusersRequest,
} from "../interfaces/users";
import { createUserService } from "../services/users.service";
import { getAllUsersService } from "../services/getAllUsers.service";
import { getProfileService } from "../services/getProfile.service";
import { editUserService } from "../services/editUser.service";
import { deleteUserService } from "../services/deleteUser.service";
import { putAdminService } from "../services/putAdmin.service";

const createUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: TusersRequest = request.body;

  const newUser: TuserResponse = await createUserService(userData);

  return response.status(201).json(newUser);
};

const getAllUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users = await getAllUsersService();
  return response.json(users);
};

const getProfileController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const profile = await getProfileService(response.locals.id);

  return response.json(profile);
};

const editUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: number = parseInt(request.params.id);
  const userData: TeditRequest = request.body;

  const updatedUser = await editUserService(userId, userData);

  return response.json(updatedUser);
};

const deleteUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: number = parseInt(request.params.id);
  const userData: TeditRequest = request.body;

  await deleteUserService(userId, userData);

  return response.status(204).send();
};

const putAdminControlle = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: number = parseInt(request.params.id);

  const returnJson = await putAdminService(userId);

  return response.status(200).json(returnJson);
};

export {
  createUsersController,
  getAllUsersController,
  getProfileController,
  editUserController,
  deleteUserController,
  putAdminControlle,
};
