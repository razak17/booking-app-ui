import Image from 'next/image';

import { Hotel } from '../types';
import styles from '../styles/searchItem.module.css';
import { useRouter } from 'next/router';

const SearchItem = ({ item, days }: { item: Hotel; days: number }) => {
	const router = useRouter();

	console.log({ days });

	const handleCheck = (route: string) => {
		if (days > 0) {
			router.push(route);
		} else {
			alert('Please select check-in date');
		}
	};

	return (
		<div className={styles.searchItem}>
			<Image width='200px' height='200px' src={item.photos[0]} alt='' className={styles.siImg} />
			<div className={styles.siDesc}>
				<h1 className={styles.siTitle}>{item.name}</h1>
				<span className={styles.siDistance}>{item.distance}m from center</span>
				<span className={styles.siTaxiOp}>Free airport taxi</span>
				<span className={styles.siSubtitle}>Studio Apartment with Air conditioning</span>
				<span className={styles.siFeatures}>{item.desc}</span>
				<span className={styles.siCancelOp}>Free cancellation </span>
				<span className={styles.siCancelOpSubtitle}>
					You can cancel later, so lock in this great price today!
				</span>
			</div>
			<div className={styles.siDetails}>
				{item.rating && (
					<div className={styles.siRating}>
						<span>Excellent</span>
						<button>{item.rating}</button>
					</div>
				)}
				<div className={styles.siDetailTexts}>
					<span className={styles.siPrice}>${item.cheapestPrice}</span>
					<span className={styles.siTaxOp}>Includes taxes and fees</span>
					<button onClick={() => handleCheck(`/hotels/${item._id}`)} className={styles.siCheckButton}>
						Check availability
					</button>
				</div>
			</div>
		</div>
	);
};

export default SearchItem;
