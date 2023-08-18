import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { resetFields } from '../app/formFields';
import { useResetPasswordMutation } from '../app/store/api/authApi';
import FormSubmitButton from '../components/buttons/form_submit/FormSubmitButton';
import LogsHeader from '../components/logs_header/LogsHeader';
import LogsTitle from '../components/logs_header/LogsTitle';
import { toast } from 'react-toastify';
import { validPassword } from '../app/utils';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { BaseQueryArg } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { IResetPassword } from '../app/types';
import Form from '../components/form/Form';

const FORM_ID = 'resetPasswordPage';

export default function ResetPasswordPage() {
  const { register, handleSubmit } = useForm<IResetPassword>();
	const navigate = useNavigate();
	const [resetPassword, { isLoading, isSuccess }] =
		useResetPasswordMutation<BaseQueryArg<BaseQueryFn>>();

	useEffect(() => {
		if (isSuccess) {
			toast.success('Changement réussi! Vous pouvez vous connecter.')
			navigate('/login');
		}
	});

	const submitForm = async (data: IResetPassword) => {
		console.log(data)
		if (data.newPassword !== data.confirmPassword) {
			toast.error('Les mots de passe ne correspondent pas.');
			return;
		}

		if (!validPassword(data.newPassword)) {
			toast.error(
				'Votre mot de passe doit comporter entre 6 et 20 caractères et contenir une majuscule, un chiffre et un caractère spécial.'
			);
			return;
		}

    delete data.confirmPassword;
		console.log(data)
		try {
			await resetPassword(data);
		} catch (error) {
			toast.error("Votre mot de passe n'a pas pu être modifié");
		}
  };

  return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 h-screen'>
				<LogsHeader />
				<div className='w-full bg-white rounded-lg shadow dark:border sm:max-w-xl dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<LogsTitle title={"Récupération de mot de passe"} />
						<Form
							id={FORM_ID}
							formClass={'space-y-4 md:space-y-6'}
							handleSubmit={handleSubmit}
							submitForm={submitForm}
							fields={resetFields}
							register={register}
						/>
						<FormSubmitButton
							label={'Créer'}
							isLoading={isLoading}
							formId={FORM_ID}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
