import express, { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import secrets from "./config/secrets";
import UserRoute from "./routes/user";
import AuthRoute from "./routes/auth";
import BookRoute from "./routes/book";

const PORT = secrets.port || 8000;
const app: Application = express();
const baseURL = "/api/v1";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: [secrets.dev, secrets.web],
  optionsSuccessStatus: 200,
  credentials: true
}));

app.use(`${baseURL}/users`, UserRoute);
app.use(`${baseURL}/login`, AuthRoute);
app.use(`${baseURL}/books`, BookRoute);

app.use('/uploads', express.static('../public/uploads'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});