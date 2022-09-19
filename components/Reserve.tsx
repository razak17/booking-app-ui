import { Dispatch, SetStateAction } from 'react';

interface ReserveProps {
	hotelId: string;
	setOpen: Dispatch<SetStateAction<boolean>>;
}
function Reserve({ hotelId, setOpen }: ReserveProps) {
	return <div>Reserve</div>;
}

export default Reserve;
