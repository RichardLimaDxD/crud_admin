import express, { Application, json } from "express";
import "express-async-errors";
import usersRouter from "./routes/users.routes";
import loginRouter from "./routes/login.routes";
import { errorHandle } from "./error";

const app: Application = express();
app.use(json());

app.use("/users", usersRouter);

app.use("/login", loginRouter);

app.use(errorHandle);

export default app;
