import Link from 'next/link';
import { useMe } from '../context/me';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
	const { user } = useMe();
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
						<button className={styles.navButton}>Register</button>
						<button className={styles.navButton}>Login</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
