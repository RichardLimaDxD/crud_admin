import { Request, Response } from "express";
import Logincreate from "../services/loginCreate.service";

const createLoginController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const user: string = await Logincreate(request.body);

  return response.status(200).json({ token: user });
};
export default createLoginController;
