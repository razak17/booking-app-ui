import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginUser } from '../../lib/api';
import { QueryKeys } from '../../types';
import styles from '../../styles/Form.module.css';
import Link from 'next/link';

export const FormSchema = z.object({
	email: z.string().email('Please enter a valid email address.'),
	password: z.string().min(6, 'Password cannot be empty')
});

type FormSchemaType = z.infer<typeof FormSchema>;

const LoginPage = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const mutation = useMutation<string, AxiosError, Parameters<typeof loginUser>['0']>(loginUser, {
		onSuccess: () => {
			router.replace('/');
			queryClient.invalidateQueries([QueryKeys.me]);
		}
	});

	const {
		register: loginForm,
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
						<h1>Login</h1>
						{mutation?.error?.response?.data && (
							<span className={styles.error}>{mutation?.error?.response?.data as string}</span>
						)}
						<input
							type='email'
							placeholder='Email'
							id='email'
							{...loginForm('email')}
							className={styles.lInput}
						/>
						{errors.email && <span className={styles.error}>{errors.email.message}</span>}
						<input
							type='password'
							placeholder='Password'
							id='password'
							{...loginForm('password')}
							className={styles.lInput}
						/>
						{errors.password && <span className={styles.error}>{errors.password.message}</span>}
						<button disabled={isSubmitting} className={styles.lButton}>
							Login
						</button>
						<span className={styles.alReg}>
							new User?
							<Link href='/auth/register'> register here</Link>
						</span>
					</>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
