import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMe } from '../context/me';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
	const { user } = useMe();
	const router = useRouter();

	return (
		<div className={styles.navbar}>
			<div className={styles.navContainer}>
				<Link href='/' style={{ color: 'inherit', textDecoration: 'none' }}>
					<span className={styles.logo}>Book Hotels</span>
				</Link>
				{user ? (
					user.username
				) : (
					<div className={styles.navItems}>
						<button onClick={() => router.push('/auth/register')} className={styles.navButton}>
							Register
						</button>
						<button onClick={() => router.push('/auth/login')} className={styles.navButton}>
							Login
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
