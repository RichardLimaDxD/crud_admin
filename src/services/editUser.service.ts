import format from "pg-format";
import { TeditRequest, TuserResponse } from "../interfaces/users";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

const editUserService = async (
  userId: number,
  userData: TeditRequest
): Promise<TuserResponse> => {
  const queryString: string = format(
    `
    UPDATE users
     SET(%I) = ROW(%L)
    WHERE
     id = $1
    RETURNING "id","name","email","admin","active";`,

    Object.keys(userData),
    Object.values(userData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<TuserResponse> = await client.query(
    queryConfig
  );

  return queryResult.rows[0];
};
export { editUserService };
