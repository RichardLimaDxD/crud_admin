import { QueryResult } from "pg";
import { TloginRequest } from "../interfaces/users";
import { client } from "../database";

const getAllUsersService = async (): Promise<Array<TloginRequest>> => {
  const queryString: string = `SELECT "id","name","email","admin","active" FROM users;`;

  const queryResult: QueryResult<TloginRequest> = await client.query(
    queryString
  );

  const result = queryResult.rows;

  return result;
};
export { getAllUsersService };
