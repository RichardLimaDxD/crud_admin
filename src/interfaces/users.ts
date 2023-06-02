import { z } from "zod";
import { editSchema } from "../schemas/users.schema";

type Tusers = {
  id: number;
  name: string;
  email: string;
  password: string;
  admin: boolean;
  active: boolean;
};

type Tlogin = {
  email: string;
  password: string;
};

type TusersRequest = Omit<Tusers, "id">;

type TuserResponse = Omit<Tusers, "password">;

type TloginRequest = Omit<Tlogin, "password">;

type TeditRequest = z.infer<typeof editSchema>;

export {
  Tusers,
  TusersRequest,
  TuserResponse,
  Tlogin,
  TloginRequest,
  TeditRequest,
};
