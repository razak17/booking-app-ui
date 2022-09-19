import { createContext, ReactNode, useContext } from 'react';
import { useQuery, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { getFeaturedHotelsCount } from '../lib/api';
import { Hotel, QueryKeys } from '../types';

const HotelContext = createContext<{
	count: number[];
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => any;
	// @ts-ignore
}>(null);

function HotelContextProvider({ children }: { children: ReactNode }) {
	const { data, isLoading, refetch } = useQuery(QueryKeys.featuredHotels, getFeaturedHotelsCount);

	return (
		<HotelContext.Provider value={{ count: data as number[], refetch }}>
			{isLoading ? <p>Loading</p> : children}
		</HotelContext.Provider>
	);
}

const useHotel = () => useContext(HotelContext);

export { HotelContextProvider, useHotel };
