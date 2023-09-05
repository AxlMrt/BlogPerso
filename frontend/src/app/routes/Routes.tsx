import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../../App";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import AccountPage from "../../pages/AccountPage";
import ServerError from "../errors/ServerError";
import ErrorHandling from "../errors/ErrorHandling";
import ProtectedRoute from "./ProtectedRoute";
import Landing from "../../pages/Landing";
import BooksPage from "../../pages/BooksPage";
import HomePage from "../../pages/HomePage";
import SendPasswordRequestPage from "../../pages/SendPasswordRequestPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import PrivacyPolicy from "../../pages/PrivacyPolicy";
import TermsAndConditions from "../../pages/TermsAndConditions";
import SinglePage from '../../pages/SinglePage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="landing" element={<Landing />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="terms-conditions" element={<TermsAndConditions />} />
      <Route
        path="reset-password-request"
        element={<SendPasswordRequestPage />}
      />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="" element={<HomePage />} />
        <Route path="table" element={<BooksPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="book/:title" element={<SinglePage />} />
      </Route>
      <Route
        path="not-found"
        element={
          <ErrorHandling
            status={404}
            detail={"Not found"}
            description={"La page que vous recherchez n'existe pas."}
          />
        }
      />
      <Route path="server-error" element={<ServerError />} />
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </Route>,
  ),
);
