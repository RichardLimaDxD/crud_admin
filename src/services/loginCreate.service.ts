import jwt from "jsonwebtoken";
import { compareSync } from "bcryptjs";
import "dotenv/config";
import format from "pg-format";
import { Tlogin, TloginRequest, Tusers } from "../interfaces/users";
import { QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";

const Logincreate = async (userData: Tlogin): Promise<string> => {
  const { email, password } = userData;

  const queryTemplate: string = `SELECT * FROM users WHERE email = %L;`;

  const queryFormat: string = format(queryTemplate, email);

  const queryResult: QueryResult<Tusers> = await client.query(queryFormat);

  const user: Tusers = queryResult.rows[0];

  if (queryResult.rowCount === 0 || !user.active) {
    throw new AppError("Wrong email/password", 401);
  }

  const passwordIsValid: boolean = compareSync(password, user.password);

  if (!passwordIsValid) {
    throw new AppError("Wrong email/password", 401);
  }

  const token = jwt.sign(
    {
      email: user.email,
      admin: user.admin,
    },
    String(process.env.SECRET_KEY)!,
    {
      expiresIn: String(process.env.EXPIRES_IN)!,
      subject: String(user.id),
    }
  );

  return token;
};

export default Logincreate;
