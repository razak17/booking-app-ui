import axios from 'axios';
import { Hotel, Room, HotelTypeCount } from '../types';
const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const auth = axios.create({
	baseURL: base,
	withCredentials: true
});

const userBase = `${base}/api/v1/users`;
const authBase = `${base}/api/v1/auth`;
const hotelsBase = `${base}/api/v1/hotels`;
const roomsBase = `${base}/api/v1/rooms`;

export async function getMe() {
	try {
		const res = await auth.get(`${userBase}/me`);
		return res.data;
	} catch {
		return null;
	}
}

export async function getHotelCountByCity(): Promise<number[]> {
	const res = await axios.get(`${hotelsBase}/countByCity?cities=berlin,madrid,london,paris`);
	return res.data;
}

export async function getHotelCountByType(): Promise<HotelTypeCount[]> {
	const res = await axios.get(`${hotelsBase}/countByType`);
	return res.data;
}

export async function getFeaturedProperties(): Promise<Hotel[]> {
	const res = await axios.get(`${hotelsBase}?featured=true`);
	return res.data;
}

export async function getHotelListing(
	destination: string,
	min: number,
	max: number
): Promise<Hotel[]> {
	if (!destination) throw new Error('destination is required');
	const res = await axios.get(
		`${hotelsBase}?city=${destination.toLowerCase()}&min=${min || 0}&max=${max || 999}`
	);
	return res.data;
}

export async function getHotelById(hotelId: string): Promise<Hotel> {
	if (!hotelId) throw new Error('hotelId is required');
	const res = await axios.get(`${hotelsBase}/find/${hotelId}`);
	return res.data;
}

export async function getHotelRooms(hotelId: string): Promise<Room[]> {
	if (!hotelId) throw new Error('hotelId is required');
	const res = await axios.get(`${hotelsBase}/room/${hotelId}`);
	return res.data;
}

export const registerUser = async (payload: {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}) => {
	const res = await axios.post(`${authBase}/register`, payload);
	return res.data;
};

export const loginUser = async (payload: { email: string; password: string }) => {
	const res = await auth.post(`${authBase}/login`, payload);
	return res.data;
};

export const logoutUser = async () => {
	const res = await auth.post(`${authBase}/logout`);
	return res.data;
};

export const updateDateAvailability = async (roomId: string, allDates: number[]) => {
	if (!roomId) throw new Error('roomId is required');
	const res = await auth.put(`${roomsBase}/availability/${roomId}`, { dates: allDates });
	return res.data;
};
