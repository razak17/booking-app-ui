import axios from 'axios';
import { Hotel, HotelTypeCount } from '../types';
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

export async function getHotelById(id: string): Promise<Hotel> {
	if (!id) throw new Error('id is required');
	const res = await axios.get(`${hotelsBase}/find/${id}`);
	return res.data;
}
