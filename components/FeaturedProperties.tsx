import React from 'react';
import Image from 'next/image';

import { useHotel } from '../context/hotels';
import styles from '../styles/FeaturedProperties.module.css';

function FeaturedProperties() {
	const { featured, featuredIsLoading } = useHotel();
	console.log({ featured });

	return (
		<div className={styles.fp}>
			{featuredIsLoading ? (
				'Loading'
			) : (
				<>
					{featured.map((item) => (
						<div className={styles.fpItem} key={item._id}>
							<Image width='100%' height='250px' src={item.photos[0]} alt='' className={styles.fpImg} />
							<span className={styles.fpName}>{item.name}</span>
							<span className={styles.fpCity}>{item.city}</span>
							<span className={styles.fpPrice}>Starting from ${item.cheapestPrice}</span>
							{item.rating && (
								<div className={styles.fpRating}>
									<button>{item.rating}</button>
									<span>Excellent</span>
								</div>
							)}
						</div>
					))}
				</>
			)}
		</div>
	);
}

export default FeaturedProperties;
