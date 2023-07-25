import express, { Application } from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cors from "cors";
import UsersRoute from "./routes/users";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use(cors({ origin: "<http://localhost:3000>" }));

app.use('/api/v1/', UsersRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
})