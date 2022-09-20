/* eslint-disable no-unused-vars */
export enum QueryKeys {
	me = 'me',
	hotels = 'hotels',
	featuredHotels = 'featuredHotels',
	hotelCountByCity = 'hotelCountByCity',
	hotelCountByType = 'hotelCountByType',
	hotelListing = 'hotelListing',
	hotelSearch = 'hotelSearch',
	hotelRooms = 'hotelRooms',
	featuredProperties = 'featuredProperties',
	rooms = 'rooms'
}

export interface Me {
	_id: string;
	email: string;
	username: string;
}

export type HotelType = 'hotel' | 'apartments' | 'resorts' | 'villas' | 'cabins';

export type HotelTypeCount = { type: string; count: number };

export interface Hotel {
	_id: string;
	name: string;
	title: string;
	desc: string;
	type: HotelType;
	city: string;
	address: string;
	distance: string;
	rating: number;
	cheapestPrice: number;
	photos: string[];
}

export type RoomNumbersType = {
	_id: string;
	number: number;
	unavailableDates: Date[];
};

export interface Room {
	_id: string;
	title: string;
	desc: string;
	price: number;
	maxPeople: number;
	roomNumbers: RoomNumbersType[];
}
