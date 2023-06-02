import { QueryResult } from "pg";
import { client } from "../database";
import { TeditRequest, TuserResponse } from "../interfaces/users";
import format from "pg-format";

const deleteUserService = async (
  userId: number,
  userData: TeditRequest
): Promise<TuserResponse> => {
  const queryString: string = format(
    `UPDATE users
       SET active = false
     WHERE
       id = $1
     RETURNING *;`
  );

  const queryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<TuserResponse> = await client.query(
    queryConfig
  );

  return queryResult.rows[0];
};
export { deleteUserService };
