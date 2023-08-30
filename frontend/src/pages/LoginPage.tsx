import { useAppDispatch, useAppSelector } from "../app/store/configureStore";
import { userLogin } from "../app/store/actions/authActions";
import { useForm } from "react-hook-form";
import { IUserLogin } from "../app/types";
import { useNavigate } from "react-router-dom";
import { loginFields } from "../app/formFields";
import Form from "../components/form/Form";
import FormSubmitButton from "../components/buttons/form_submit/FormSubmitButton";
import LogsFooter from "../components/logs_footer/LogsFooter";
import LogsTitle from "../components/logs_header/LogsTitle";
import LogsHeader from "../components/logs_header/LogsHeader";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import RememberMe from "../components/logs_footer/RememberMe";

const FORM_ID = "loginPage";

export default function LoginPage() {
  const { loading, success, error } = useAppSelector((state) => state.auth);
  const [check, setCheck] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<IUserLogin>();

  const handleUpdate = () => {
    setCheck(!check);
  };

  useEffect(() => {
    if (error) {
      navigate("/login");
      toast.error("Vos identifiants sont incorrectes.");
    }

    if (success === "true") {
      navigate("/");
      toast.success("Connexion réussie!");
    }
  }, [navigate, error, success]);

  const submitForm = async (data: IUserLogin) => {
    data.remember = check;

    try {
      await dispatch(userLogin(data));
    } catch (error) {
      console.log("Failed to login: ", error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 h-screen">
        <LogsHeader />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <LogsTitle title={"Se connecter"} />
            <Form
              id={FORM_ID}
              formClass={"space-y-4 md:space-y-6"}
              handleSubmit={handleSubmit}
              submitForm={submitForm}
              fields={loginFields}
              register={register}
            />
            <FormSubmitButton
              label={"Connexion"}
              isLoading={loading}
              formId={FORM_ID}
            />
            <RememberMe isCheck={handleUpdate} />
            <LogsFooter
              label={"Pas encore de compte"}
              dest={"/register"}
              buttonLabel={"S'inscrire"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
