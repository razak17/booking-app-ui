import React from 'react';
import Image from 'next/image';
import styles from '../styles/Featured.module.css';

function FeaturedItem({
	count,
	city,
	imageSrc
}: {
	count: number;
	city: string;
	imageSrc: string;
}) {
	return (
		<div className={styles.featuredItem}>
			<Image layout='fill' src={imageSrc} alt='featuredHotel' className={styles.featuredImg} />
			<div className={styles.featuredTitles}>
				<h1>{city}</h1>
				<h2>{count} properties</h2>
			</div>
		</div>
	);
}

export default FeaturedItem;
