import {
	faBed,
	faCalendarDays,
	faCar,
	faPerson,
	faPlane,
	faTaxi
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateRange, Range } from 'react-date-range';
import { useState } from 'react';
import { format } from 'date-fns';

import styles from '../styles/Header.module.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useMe } from '../context/me';
import { useRouter } from 'next/router';
import { useSearch } from '../context/search';

const Header = ({ type }: { type?: string }) => {
	const router = useRouter();
	const [openDate, setOpenDate] = useState(false);
	const [openOptions, setOpenOptions] = useState(false);

	const { user } = useMe();
	const { destination, setDestination, dates, setDates, options, setOptions } = useSearch();

	const handleOption = (name: 'adult' | 'children' | 'rooms', operation: string) => {
		setOptions((prev) => {
			return {
				...prev,
				[name]: operation.toString() === 'i' ? options[name] + 1 : options[name] - 1
			};
		});
	};

	const handleSearch = () => {
		router.push('/hotels');
	};

	return (
		<div className={styles.header}>
			{/* eslint-disable max-len */}
			<div
				className={
					type === 'list' ? `${styles.headerContainer} ${styles.listMode}` : `{styles.headerContainer}`
				}
			>
				{/* eslint-enable max-len */}
				<div className={styles.headerList}>
					<div className={`${styles.headerListItem} ${styles.active}`}>
						<FontAwesomeIcon icon={faBed} />
						<span>Stays</span>
					</div>
					<div className={styles.headerListItem}>
						<FontAwesomeIcon icon={faPlane} />
						<span>Flights</span>
					</div>
					<div className={styles.headerListItem}>
						<FontAwesomeIcon icon={faCar} />
						<span>Car rentals</span>
					</div>
					<div className={styles.headerListItem}>
						<FontAwesomeIcon icon={faBed} />
						<span>Attractions</span>
					</div>
					<div className={styles.headerListItem}>
						<FontAwesomeIcon icon={faTaxi} />
						<span>Airport taxis</span>
					</div>
				</div>
				{!type && type !== 'list' && (
					<>
						{/* eslint-disable max-len */}
						<h1 className={styles.headerTitle}>A lifetime of discounts? It&apos;s Genius.</h1>
						<p className={user ? styles.headerDescAuth : styles.headerDesc}>
							Get rewarded for your travels ??? unlock instant savings of 10% or more with a free Lamabooking
							account
						</p>
						{!user && <button className={styles.headerBtn}>Sign in / Register</button>}
						<div className={styles.headerSearchContainer}>
							<div className={styles.headerSearch}>
								<div className={styles.headerSearchItem}>
									<FontAwesomeIcon icon={faBed} className={styles.headerIcon} />
									<input
										type='text'
										placeholder='Where are you going?'
										className={styles.headerSearchInput}
										onChange={(e) => setDestination(e.target.value)}
									/>
								</div>
								<div className={styles.headerSearchItem}>
									<FontAwesomeIcon icon={faCalendarDays} className={styles.headerIcon} />
									<span
										onClick={() => setOpenDate(!openDate)}
										className={styles.headerSearchText}
									>{`${format(dates[0].startDate as Date, 'MM/dd/yyyy')} to ${format(
										dates[0].endDate as Date,
										'MM/dd/yyyy'
									)}`}</span>
									{openDate && (
										<DateRange
											editableDateInputs={true}
											onChange={(item) => setDates([item.selection as Range])}
											moveRangeOnFirstSelection={false}
											ranges={dates}
											className={styles.date}
											minDate={new Date()}
										/>
									)}
								</div>
								<div className={styles.headerSearchItem}>
									<FontAwesomeIcon icon={faPerson} className={styles.headerIcon} />
									<span
										onClick={() => setOpenOptions(!openOptions)}
										className={styles.headerSearchText}
									>{`${options.adult} adult ?? ${options.children} children ?? ${options.rooms} room`}</span>
									{/* eslint-enable max-len */}
									{openOptions && (
										<div className={styles.options}>
											<div className={styles.optionItem}>
												<span className={styles.optionText}>Adult</span>
												<div className={styles.optionCounter}>
													<button
														disabled={options.adult <= 1}
														className={styles.optionCounterButton}
														onClick={() => handleOption('adult', 'd')}
													>
														-
													</button>
													{/* eslint-disable-next-line max-len */}
													<span className={styles.optionCounterNumber}>{options.adult}</span>
													<button
														className={styles.optionCounterButton}
														onClick={() => handleOption('adult', 'i')}
													>
														+
													</button>
												</div>
											</div>
											<div className={styles.optionItem}>
												<span className={styles.optionText}>Children</span>
												<div className={styles.optionCounter}>
													<button
														disabled={options.children <= 0}
														className={styles.optionCounterButton}
														onClick={() => handleOption('children', 'd')}
													>
														-
													</button>
													{/* eslint-disable-next-line max-len */}
													<span className={styles.optionCounterNumber}>{options.children}</span>
													<button
														className={styles.optionCounterButton}
														onClick={() => handleOption('children', 'i')}
													>
														+
													</button>
												</div>
											</div>
											<div className={styles.optionItem}>
												<span className={styles.optionText}>Room</span>
												<div className={styles.optionCounter}>
													<button
														disabled={options.rooms <= 1}
														className={styles.optionCounterButton}
														onClick={() => handleOption('rooms', 'd')}
													>
														-
													</button>
													{/* eslint-disable-next-line max-len */}
													<span className={styles.optionCounterNumber}>{options.rooms}</span>
													<button
														className={styles.optionCounterButton}
														onClick={() => handleOption('rooms', 'i')}
													>
														+
													</button>
												</div>
											</div>
										</div>
									)}
									<button className={styles.searchBtn} onClick={handleSearch}>
										Search
									</button>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Header;
