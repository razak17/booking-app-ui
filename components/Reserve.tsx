import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from 'react-query';
import { getHotelRooms } from '../lib/api';

import styles from '../styles/Reserve.module.css';
import { QueryKeys, Room, RoomNumbersType } from '../types';
import { useSearch } from '../context/search';
import { useRouter } from 'next/router';
import { useIsAuth } from '../utils/useIsAuth';

interface ReserveProps {
	hotelId: string;
	setOpen: Dispatch<SetStateAction<boolean>>;
}
function Reserve({ hotelId, setOpen }: ReserveProps) {
	useIsAuth();
	const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);
	const { data, isLoading } = useQuery([QueryKeys.hotelRooms], () => getHotelRooms(hotelId));
	const { dates } = useSearch();

	const getDatesInRange = (startDate: Date, endDate: Date) => {
		const start = new Date(startDate);
		const end = new Date(endDate);

		const date = new Date(start.getTime());

		const dates = [];

		while (date <= end) {
			dates.push(new Date(date).getTime());
			date.setDate(date.getDate() + 1);
		}
		return dates;
	};

	const alldates = getDatesInRange(dates[0].startDate as Date, dates[0].endDate as Date);

	const isAvailable = (roomNumber: RoomNumbersType) => {
		const isFound = roomNumber.unavailableDates.some((date) =>
			alldates.includes(new Date(date).getTime())
		);

		return !isFound;
	};

	const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
		// const checked = e.target.checked;
		// const value = e.target.value;
		// setSelectedRooms(
		// 	checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value)
		// );
	};

	const router = useRouter();

	const handleClick = () => {
		//try {
		//  await Promise.all(
		//    selectedRooms.map((roomId) => {
		//      const res = axios.put(`/rooms/availability/${roomId}`, {
		//        dates: alldates,
		//      });
		//      return res.data;
		//    })
		//  );
		//  setOpen(false);
		router.push('/');
		// } catch (err) {}
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
