import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IRegister } from '../app/types';
import { useAddNewUserMutation } from '../app/store/api/usersApi';
import { signupFields } from '../app/formFields';
import Form from '../components/form/Form';
import FormSubmitButton from '../components/buttons/form_submit/FormSubmitButton';
import LogsFooter from '../components/logs_footer/LogsFooter';
import LogsTitle from '../components/logs_header/LogsTitle';
import LogsHeader from '../components/logs_header/LogsHeader';
import { isEmail, validPassword } from '../app/utils/validation';
import { toast } from 'react-toastify';
import {
	BaseQueryArg,
	BaseQueryFn,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const FORM_ID = 'registerPage';

export default function RegisterPage() {
	const [addUser, { isLoading, isError, isSuccess, error }] =
		useAddNewUserMutation<BaseQueryArg<BaseQueryFn>>();
	const { register, handleSubmit } = useForm<IRegister>();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) navigate('/register');
		if (error && error.originalStatus === 409)
			toast.error('Cet email est déjà utilisé');
	}, [navigate, isSuccess, isError, error]);

	const submitForm = async (data: IRegister) => {
		if (!isEmail(data.email)) {
			toast.error('Entrez un email valide.');
			return;
		}

		if (data.password !== data.confirmPassword) {
			toast.error('Les mots de passe ne correspondent pas.');
			return;
		}

		if (!validPassword(data.password)) {
			toast.error(
				'Votre mot de passe doit comporter entre 6 et 20 caractères et contenir une majuscule, un chiffre et un caractère spécial.'
			);
			return;
		}

		delete data.confirmPassword;
		try {
			await addUser(data);
		} catch (error) {
			console.error('Failed to create user: ', error);
		}
	};

	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 h-screen'>
				<LogsHeader />
				<div className='w-full bg-white rounded-lg shadow dark:border sm:max-w-xl dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<LogsTitle title={"S'inscrire"} />
						<Form
							id={FORM_ID}
							formClass={'space-y-4 md:space-y-6'}
							handleSubmit={handleSubmit}
							submitForm={submitForm}
							fields={signupFields}
							register={register}
						/>
						<FormSubmitButton
							label={'Créer'}
							isLoading={isLoading}
							formId={FORM_ID}
						/>
						<LogsFooter
							label={'Déjà un compte'}
							dest={'/login'}
							buttonLabel={'Se connecter'}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
