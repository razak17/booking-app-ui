import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { registerUser } from '../../lib/api';
import { QueryKeys } from '../../types';
import styles from '../../styles/Form.module.css';
import Link from 'next/link';

export const FormSchema = z
	.object({
		username: z.string().min(2, 'Username must be at least 2 characters long'),
		email: z.string().email('Please enter a valid email address.'),
		password: z
			.string()
			.min(6, 'Please choose a longer password')
			.max(256, 'Consider using a short password'),
		confirmPassword: z
			.string()
			.min(6, 'Please choose a longer password')
			.max(256, 'Consider using a short password')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'passwords do not match',
		path: ['confirmPassword']
	});

type FormSchemaType = z.infer<typeof FormSchema>;

const RegisterPage = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const mutation = useMutation<string, AxiosError, Parameters<typeof registerUser>['0']>(
		registerUser,
		{
			onSuccess: () => {
				router.push('/login');
				queryClient.invalidateQueries([QueryKeys.me]);
			}
		}
	);

	const {
		register: registerForm,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema)
	});

	const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
		mutation.mutate(data);
	};

	return (
		<div className={styles.login}>
			<div className={styles.lContainer}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<>
						<h1>Register</h1>
						{mutation?.error?.response?.data && (
							<span className={styles.error}>{mutation?.error?.response?.data as string}</span>
						)}
						<input
							type='text'
							placeholder='Username'
							id='username'
							{...registerForm('username')}
							className={styles.lInput}
						/>
						{errors.username && <span className={styles.error}>{errors.username.message}</span>}
						<input
							type='email'
							placeholder='Email'
							id='email'
							{...registerForm('email')}
							className={styles.lInput}
						/>
						{errors.email && <span className={styles.error}>{errors.email.message}</span>}
						<input
							type='password'
							placeholder='Password'
							id='password'
							{...registerForm('password')}
							className={styles.lInput}
						/>
						{errors.password && <span className={styles.error}>{errors.password.message}</span>}
						<input
							type='password'
							placeholder='Confirm Password'
							id='confirmPassword'
							{...registerForm('confirmPassword')}
							className={styles.lInput}
						/>
						{errors.confirmPassword && (
							<span className={styles.error}>{errors.confirmPassword.message}</span>
						)}
						<button disabled={isSubmitting} className={styles.lButton}>
							Register
						</button>
						<span className={styles.alReg}>
							already registered?
							<Link href='/auth/login'> login here</Link>
						</span>
					</>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
