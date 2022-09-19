import { createContext, ReactNode, useContext } from 'react';
import { useQuery, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { getFeaturedProperties, getHotelCountByCity, getHotelCountByType } from '../lib/api';
import { Hotel, HotelTypeCount, QueryKeys } from '../types';

type RefetchType = <TPageData>(
	options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
) => any;

const HotelContext = createContext<{
	count: number[];
	countIsLoading: boolean;
	type: HotelTypeCount[];
	typeIsLoading: boolean;
	featured: Hotel[];
	featuredIsLoading: boolean;
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
	const {
		data: featuredProperties,
		isLoading: featuredIsLoading,
		refetch: featuredRefetch
	} = useQuery(QueryKeys.featuredProperties, getFeaturedProperties);

	return (
		<HotelContext.Provider
			value={{
				count: countByCity as number[],
				countIsLoading,
				type: countbyType as HotelTypeCount[],
				typeIsLoading,
				featured: featuredProperties as Hotel[],
				featuredIsLoading
			}}
		>
			{children}
		</HotelContext.Provider>
	);
}

const useHotel = () => useContext(HotelContext);

export { HotelContextProvider, useHotel };
