import type { NextPage } from 'next';
import Featured from '../components/Featured';
import FeaturedProperties from '../components/FeaturedProperties';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MailList from '../components/MailList';
import Navbar from '../components/Navbar';
import PropertyList from '../components/PropertyList';
import { HotelContextProvider } from '../context/hotels';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
	return (
		<HotelContextProvider>
				<Navbar />
				<Header />
				<div className={styles.homeContainer}>
					<Featured />
					<h1 className={styles.homeTitle}>Browse by property type</h1>
					<PropertyList />
					<h1 className={styles.homeTitle}>Homes guests love</h1>
					<FeaturedProperties />
					<MailList />
					<Footer />
				</div>
		</HotelContextProvider>
	);
};

export default Home;
