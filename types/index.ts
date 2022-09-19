export enum QueryKeys {
	me = 'me',
	hotels = 'hotels',
	featuredHotels = 'featuredHotels',
	rooms = 'rooms'
}

export interface Me {
	_id: string;
	email: string;
	username: string;
}

export type HotelType = 'hotel' | 'apartments' | 'resorts' | 'villas' | 'cabins';

export interface Hotel {
	_id: string;
	name: string;
	type: HotelType;
	city: string;
	address: string;
	distance: string;
}
