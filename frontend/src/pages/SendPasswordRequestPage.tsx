import FormSubmitButton from '../components/buttons/form_submit/FormSubmitButton';
import LogsHeader from '../components/logs_header/LogsHeader';
import LogsTitle from '../components/logs_header/LogsTitle';
import Input from '../components/form/form_input/Input';
import { useRequestNewPasswordMutation } from '../app/store/api/authApi';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RequestPassword } from '../app/types';
import { toast } from 'react-toastify';

const FORM_ID = 'requestResetPage';

export default function SendPasswordRequestPage() {
	const { register, handleSubmit } = useForm<RequestPassword>();
	const navigate = useNavigate();
	const [requestNewPassword, { isLoading, isSuccess }] =
		useRequestNewPasswordMutation();

	useEffect(() => {
		if (isSuccess) {
			toast.success('Un code vous a été envoyé par email!');
			navigate('/reset-password');
		}
	});

	const submitForm = async (data: { email: string }) => {
		try {
			await requestNewPassword(data);
		} catch (error) {
			console.log('Failed to login: ', error);
		}
	};

	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 h-screen'>
				<LogsHeader />
				<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<LogsTitle title={'Récupération de mot de passe'} />
						<h3 className='text-sm dark:text-gray-300'>
							Pas d'inquiétudes ! Nous allons vous aider.
						</h3>
						<form id={FORM_ID} onSubmit={handleSubmit(submitForm)}>
							<Input
								type={'email'}
								holder={'john.doe@gmail.com'}
								register={register}
								name={'email'}
								labelText={'Email'}
								labelFor={'email'}
								id={FORM_ID}
								isRequired={true}
							/>
						</form>
						<FormSubmitButton
							label={'Confirmer'}
							isLoading={isLoading}
							formId={FORM_ID}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
