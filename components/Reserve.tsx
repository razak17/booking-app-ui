import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from 'react-query';
import { getHotelRooms, updateDateAvailability } from '../lib/api';

import styles from '../styles/Reserve.module.css';
import { QueryKeys, RoomNumbersType } from '../types';
import { useSearch } from '../context/search';
import { useRouter } from 'next/router';
import { getDatesInRange } from '../utils/dates';

interface ReserveProps {
	hotelId: string;
	setOpen: Dispatch<SetStateAction<boolean>>;
}
function Reserve({ hotelId, setOpen }: ReserveProps) {
	const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([]);
	const { data } = useQuery([QueryKeys.hotelRooms], () => getHotelRooms(hotelId));
	const { dates } = useSearch();

	const router = useRouter();

	const alldates = getDatesInRange(dates[0].startDate as Date, dates[0].endDate as Date);

	const isAvailable = (roomNumber: RoomNumbersType) => {
		const isFound = roomNumber.unavailableDates.some((date) =>
			alldates.includes(new Date(date).getTime())
		);

		return !isFound;
	};

	const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		const value = e.target.value;
		console.log({ checked, value });
		setSelectedRoomIds(
			checked ? [...selectedRoomIds, value] : selectedRoomIds.filter((item) => item !== value)
		);
	};

	const handleClick = async () => {
		try {
			await Promise.all(
				selectedRoomIds.map((selectedId) => {
					console.log({ selectedId });
					const res = updateDateAvailability(selectedId, alldates);
					return res;
				})
			);
			setOpen(false);
			router.replace('/');
		} catch (err) {
			throw err;
		}
	};

	return (
		<div className={styles.reserve}>
			<div className={styles.rContainer}>
				<FontAwesomeIcon
					icon={faCircleXmark}
					className={styles.rClose}
					onClick={() => setOpen(false)}
				/>
				<span>Select your rooms:</span>
				{data?.map((item) => (
					<div className={styles.rItem} key={item._id}>
						<div className={styles.rItemInfo}>
							<div className={styles.rTitle}>{item.title}</div>
							<div className={styles.rDesc}>{item.desc}</div>
							<div className={styles.rMax}>
								Max people: <b>{item.maxPeople}</b>
							</div>
							<div className={styles.rPrice}>{item.price}</div>
						</div>
						<div className={styles.rSelectRooms}>
							{item.roomNumbers.map((roomNumber, i) => (
								<div className={styles.room} key={i}>
									<label>{roomNumber.number}</label>
									<input
										type='checkbox'
										value={roomNumber._id}
										onChange={handleSelect}
										disabled={!isAvailable(roomNumber)}
									/>
								</div>
							))}
						</div>
					</div>
				))}
				<button onClick={handleClick} className={styles.rButton}>
					Reserve Now!
				</button>
			</div>
		</div>
	);
}

export default Reserve;
