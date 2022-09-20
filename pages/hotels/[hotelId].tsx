import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleArrowLeft,
	faCircleArrowRight,
	faCircleXmark,
	faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import { useMe } from '../../context/me';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import { QueryKeys } from '../../types';
import { getHotelById } from '../../lib/api';
import { useSearch } from '../../context/search';
import MailList from '../../components/MailList';
import Footer from '../../components/Footer';
import Reserve from '../../components/Reserve';
import styles from '../../styles/Hotel.module.css';
import { dayDifference } from '../../utils/dates';

const Hotel = () => {
	const router = useRouter();
	const { user } = useMe();
	const [slideNumber, setSlideNumber] = useState(0);
	const [open, setOpen] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const id = router.asPath.split('/')[2];
	console.log({ router, id });

	const { data, isLoading } = useQuery([QueryKeys.hotelSearch], () => getHotelById(id));
	console.log({ data });

	const { dates, options } = useSearch();

	const days = dayDifference(dates[0].endDate as Date, dates[0].startDate as Date);

	const handleOpen = (i: number) => {
		setSlideNumber(i);
		setOpen(true);
	};

	const handleMove = (direction: string) => {
		let newSlideNumber;

		if (direction === 'l') {
			newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
		} else {
			newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
		}

		setSlideNumber(newSlideNumber);
	};

	const handleClick = () => {
		if (!user) {
			alert('Please login to book a room');
			return;
		}
		if (days <= 0) {
			alert('Please add a date range');
			return;
		}
		setOpenModal(true);
	};

	return (
		<div>
			<Navbar />
			<Header type='list' />
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className={styles.hotelContainer}>
					{open && (
						<div className={styles.slider}>
							<FontAwesomeIcon
								icon={faCircleXmark}
								className={styles.close}
								onClick={() => setOpen(false)}
							/>
							<FontAwesomeIcon
								icon={faCircleArrowLeft}
								className={styles.arrow}
								onClick={() => handleMove('l')}
							/>
							<div className={styles.sliderWrapper}>
								<Image
									height='100vh'
									width='80%'
									src={data?.photos[slideNumber] as string}
									alt=''
									className={styles.sliderImg}
								/>
							</div>
							<FontAwesomeIcon
								icon={faCircleArrowRight}
								className={styles.arrow}
								onClick={() => handleMove('r')}
							/>
						</div>
					)}
					<div className={styles.hotelWrapper}>
						<button className={styles.bookNow} onClick={handleClick}>
							Reserve or Book Now!
						</button>
						<h1 className={styles.hotelTitle}>{data?.name}</h1>
						<div className={styles.hotelAddress}>
							<FontAwesomeIcon icon={faLocationDot} />
							<span>{data?.address}</span>
						</div>
						<span className={styles.hotelDistance}>
							Excellent location – {data?.distance}km from center
						</span>
						<span className={styles.hotelPriceHighlight}>
							Book a stay over ${data?.cheapestPrice} at this property and get a free airport taxi
						</span>
						<div className={styles.hotelImages}>
							{data?.photos?.map((photo, i) => (
								<div className={styles.hotelImgWrapper} key={i}>
									<Image
										width='100%'
										height='100%'
										onClick={() => handleOpen(i)}
										src={photo}
										alt=''
										className={styles.hotelImg}
									/>
								</div>
							))}
						</div>
						<div className={styles.hotelDetails}>
							<div className={styles.hotelDetailsTexts}>
								<h1 className={styles.hotelTitle}>{data?.title}</h1>
								<p className={styles.hotelDesc}>{data?.desc}</p>
							</div>
							<div className={styles.hotelDetailsPrice}>
								<h1>Perfect for a {days}-night stay!</h1>
								<span>
									Located in the real heart of Krakow, this property has an excellent location score of 9.8!
								</span>
								<h2>
									{data?.cheapestPrice ? (
										<>
											<b>${days * data?.cheapestPrice * options.rooms}</b> ({days} nights)
										</>
									) : (
										<>
											<b>1</b> ({days} nights)
										</>
									)}
								</h2>
								<button onClick={handleClick}>Book Now!</button>
							</div>
						</div>
					</div>
					<MailList />
					<Footer />
				</div>
			)}
			{openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
		</div>
	);
};

export default Hotel;
