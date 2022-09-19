import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
	return (
		<div className={styles.navbar}>
			<div className={styles.navContainer}>
				<Link href='/' style={{ color: 'inherit', textDecoration: 'none' }}>
					<span className={styles.logo}>Book Hotels</span>
				</Link>
				<div className={styles.navItems}>
					<button className={styles.navButton}>Register</button>
					<button className={styles.navButton}>Login</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
