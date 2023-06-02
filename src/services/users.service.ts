import { TuserResponse, TusersRequest } from "../interfaces/users";
import format from "pg-format";
import { QueryResult } from "pg";
import { client } from "../database";
import { passwordCreateSchema } from "../schemas/users.schema";
import { hashSync } from "bcryptjs";

const createUserService = async (
  userData: TusersRequest
): Promise<TuserResponse> => {
  userData.password = hashSync(userData.password, 12);

  const queryString: string = format(
    `
   INSERT INTO 
   "users" (%I)
   VALUES (%L)
   RETURNING *;`,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: QueryResult<TuserResponse> = await client.query(
    queryString
  );

  const userCreateSucess = queryResult.rows[0];

  return passwordCreateSchema.parse(userCreateSucess);
};

export { createUserService };
