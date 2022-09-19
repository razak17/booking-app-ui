import axios from 'axios';
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
