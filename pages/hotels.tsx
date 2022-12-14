import { useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import { useRouter } from 'next/router';

import styles from '../styles/Hotels.module.css';
import { useQuery } from 'react-query';
import { QueryKeys } from '../types';
import { getHotelListing } from '../lib/api';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import SearchItem from '../components/SearchItem';
import { useSearch } from '../context/search';
import { dayDifference } from '../utils/dates';
import Loader from '../components/Loader';

const HotelsPage = () => {
	const router = useRouter();
	console.log({ router });
	const { destination, setDestination, dates, setDates, options, setOptions } = useSearch();
	const [openDate, setOpenDate] = useState(false);
	const [min, setMin] = useState(0);
	const [max, setMax] = useState(999);

	const { data, isLoading, refetch } = useQuery([QueryKeys.hotelListing], () =>
		getHotelListing(destination, min, max)
	);

	const days = dayDifference(dates[0].endDate as Date, dates[0].startDate as Date);

	const handleClick = () => {
		refetch();
	};

	return (
		<div>
			<Navbar />
			<Header type='list' />
			<div className={styles.listContainer}>
				<div className={styles.listWrapper}>
					<div className={styles.listSearch}>
						<h1 className={styles.lsTitle}>Search</h1>
						<div className={styles.lsItem}>
							<label>Destination</label>
							<input
								placeholder={destination}
								type='text'
								value={destination}
								onChange={(e) => setDestination(e.target.value)}
							/>
						</div>
						<div className={styles.lsItem}>
							<label>Check-in Date</label>
							<span onClick={() => setOpenDate(!openDate)}>
								{`${format(dates[0].startDate as Date, 'MM/dd/yyyy')} to ${format(
									dates[0].endDate as Date,
									'MM/dd/yyyy'
								)}`}
							</span>
							{openDate && (
								<DateRange
									onChange={(item) => setDates([item.selection])}
									minDate={new Date()}
									ranges={dates}
								/>
							)}
						</div>
						<div className={styles.lsItem}>
							<label>Options</label>
							<div className={styles.lsOptions}>
								<div className={styles.lsOptionItem}>
									<span className={styles.lsOptionText}>
										Min price <small>per night</small>
									</span>
									<input
										type='number'
										onChange={(e) => setMin(parseInt(e.target.value))}
										className={styles.lsOptionInput}
									/>
								</div>
								<div className={styles.lsOptionItem}>
									<span className={styles.lsOptionText}>
										Max price <small>per night</small>
									</span>
									<input
										type='number'
										onChange={(e) => setMax(parseInt(e.target.value))}
										className={styles.lsOptionInput}
									/>
								</div>
								<div className={styles.lsOptionItem}>
									<span className={styles.lsOptionText}>Adult</span>
									<input
										type='number'
										min={1}
										className={styles.lsOptionInput}
										onChange={(e) => setOptions({ ...options, adult: parseInt(e.target.value) })}
										placeholder={options.adult.toString()}
									/>
								</div>
								<div className={styles.lsOptionItem}>
									<span className={styles.lsOptionText}>Children</span>
									<input
										type='number'
										min={0}
										className={styles.lsOptionInput}
										onChange={(e) => setOptions({ ...options, children: parseInt(e.target.value) })}
										placeholder={options.children.toString()}
									/>
								</div>
								<div className={styles.lsOptionItem}>
									<span className='lsOptionText'>Rooms</span>
									<input
										type='number'
										min={1}
										className={styles.lsOptionInput}
										onChange={(e) => setOptions({ ...options, rooms: parseInt(e.target.value) })}
										placeholder={options.rooms.toString()}
									/>
								</div>
							</div>
						</div>
						<button onClick={handleClick}>Search</button>
					</div>
					<div className={styles.listResult}>
						{isLoading ? (
              <Loader />
						) : (
							<>
								{data?.length ? (
									data?.map((item) => <SearchItem days={days} item={item} key={item._id} />)
								) : (
									<h3>No Results Found At this Time</h3>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HotelsPage;
