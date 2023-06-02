import { QueryConfig, QueryResult } from "pg";
import { TloginRequest, Tusers } from "../interfaces/users";
import { client } from "../database";

const getProfileService = async (userId: number): Promise<TloginRequest> => {
  const queryString: string = `
  SELECT 
     "id","name","email","admin","active" 
  FROM 
     users 
  WHERE 
     id = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult<Tusers> = await client.query(queryConfig);

  return queryResult.rows[0];
};

export { getProfileService };
