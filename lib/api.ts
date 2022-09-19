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
	const res = await auth.get(`${hotelsBase}/countByCity?cities=berlin,madrid,london,paris`);
	return res.data;
}

export async function getHotelCountByType(): Promise<HotelTypeCount[]> {
	const res = await auth.get(`${hotelsBase}/countByType`);
	return res.data;
}

export async function getFeaturedProperties(): Promise<Hotel[]> {
	const res = await auth.get(`${hotelsBase}?featured=true`);
	return res.data;
}
