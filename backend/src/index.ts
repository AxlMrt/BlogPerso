import express, { Application } from "express";
import bodyParser from "body-parser";
import secrets from "./config/secrets";
import cors from "cors";
import UsersRoute from "./routes/users";
import AuthRoute from "./routes/auth";

const PORT = secrets.port || 8000;
const app: Application = express();
const baseURL = "/api/v1"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use(cors({ origin: "<http://localhost:3000>" }));

app.use(`${baseURL}/users`, UsersRoute);
app.use(`${baseURL}/login`, AuthRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
})