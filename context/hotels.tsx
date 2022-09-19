import { createContext, ReactNode, useContext } from 'react';
import { useQuery, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { getHotelCountByCity, getHotelCountByType } from '../lib/api';
import { Hotel, HotelTypeCount, QueryKeys } from '../types';

type RefetchType = <TPageData>(
	options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
) => any;

const HotelContext = createContext<{
	count: number[];
	type: HotelTypeCount[];
	// refetch: RefetchType;
	// @ts-ignore
}>(null);

function HotelContextProvider({ children }: { children: ReactNode }) {
	const {
		data: countByCity,
		isLoading: countIsLoading,
		refetch: countRefetch
	} = useQuery(QueryKeys.hotelCountByCity, getHotelCountByCity);
	const {
		data: countbyType,
		isLoading: typeIsLoading,
		refetch: typeRefetch
	} = useQuery(QueryKeys.hotelCountByType, getHotelCountByType);

	return (
		<HotelContext.Provider
			value={{ count: countByCity as number[], type: countbyType as HotelTypeCount[] }}
		>
			{countIsLoading || typeIsLoading ? <p>Loading</p> : children}
		</HotelContext.Provider>
	);
}

const useHotel = () => useContext(HotelContext);

export { HotelContextProvider, useHotel };
