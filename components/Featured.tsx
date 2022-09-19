import { useHotel } from '../context/hotels';
import styles from '../styles/Featured.module.css';
import FeaturedItem from './FeaturedItem';

const Featured = () => {
	const { count, countIsLoading } = useHotel();
	console.log({ count });

	return (
		<div className={styles.featured}>
			{countIsLoading ? (
				<p>Loading please wait</p>
			) : (
				<>
					<FeaturedItem
						city='Berlin'
						count={count[0]}
						imageSrc='https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o='
					/>
					<FeaturedItem
						city='Madrid'
						count={count[1]}
						imageSrc='https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o='
					/>
					<FeaturedItem
						city='London'
						count={count[1]}
						imageSrc='https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o='
					/>
				</>
			)}
		</div>
	);
};

export default Featured;
