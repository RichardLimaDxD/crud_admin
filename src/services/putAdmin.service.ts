import format from "pg-format";
import { TeditRequest, TuserResponse } from "../interfaces/users";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";

const putAdminService = async (userId: number): Promise<TuserResponse> => {
  let queryString: string = format(
    `
      SELECT 
        *
      FROM users
       WHERE
      id = $1;`
  );

  let queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  let queryResult: QueryResult<TuserResponse> = await client.query(queryConfig);

  if (queryResult.rows[0].active === true) {
    throw new AppError("User already active", 400);
  }

  queryString = format(
    `
      UPDATE users
       SET (active) = ROW(true)
      WHERE
       id = $1
      RETURNING 
       "id","name","email","admin","active";`
  );

  queryConfig = {
    text: queryString,
    values: [userId],
  };

  queryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};
export { putAdminService };
