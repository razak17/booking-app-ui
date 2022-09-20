import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { useMe } from '../context/me';
import { logoutUser } from '../lib/api';
import styles from '../styles/Navbar.module.css';
import { QueryKeys } from '../types';

const Navbar = () => {
	const { user } = useMe();
	const router = useRouter();
	const queryClient = useQueryClient();

	const mutation = useMutation<string, AxiosError, Parameters<typeof logoutUser>>(logoutUser, {
		onSuccess: () => {
			queryClient.invalidateQueries([QueryKeys.me]);
		}
	});

	const handleLogout = () => {
		mutation.mutate([]);
	};

	return (
		<div className={styles.navbar}>
			<div className={styles.navContainer}>
				<Link href='/' style={{ color: 'inherit', textDecoration: 'none' }}>
					<span className={styles.logo}>Bookin</span>
				</Link>
				{user ? (
					<div className={styles.userInfo}>
						<p>{user.username}</p>
						<button onClick={handleLogout} className={styles.infoButton}>
							Logout
						</button>
					</div>
				) : (
					<div className={styles.navItems}>
						<button onClick={() => router.push('/auth/register')} className={styles.infoButton}>
							Register
						</button>
						<button onClick={() => router.push('/auth/login')} className={styles.infoButton}>
							Login
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
