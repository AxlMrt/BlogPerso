import express, { Application, Request } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import secrets from './config/secrets';
import UserRoute from './routes/user';
import AuthRoute from './routes/auth';
import BookRoute from './routes/book';
import NoteRoute from './routes/note';
import QueryRoute from './routes/userQuery';
import RefreshRoute from './routes/refreshToken';
import OTProutes from './routes/otp';
import { removeEmptyKeysFromBody } from './middleware/removeEmptyKeys.middleware';
const PORT = secrets.port || 3000;
const app: Application = express();
const baseURL = '/api/v1';

const options: cors.CorsOptions = {
  credentials: true,
  optionsSuccessStatus: 200,
  origin: secrets.web,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
};

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors<Request>(options));
app.use(removeEmptyKeysFromBody);

app.use(`${baseURL}/users`, UserRoute);
app.use(`${baseURL}/login`, AuthRoute);
app.use(`${baseURL}/books`, BookRoute);
app.use(`${baseURL}/notes`, NoteRoute);
app.use(`${baseURL}/query`, QueryRoute);
app.use(`${baseURL}/refresh`, RefreshRoute);
app.use(`${baseURL}/otp`, OTProutes);

app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

export default app;
