import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

export type DatesType = {
	startDate?: Date;
	endDate?: Date;
	key?: string;
};

export type OptionsType = { adult: number; children: number; room: number };

const SearchContext = createContext<{
	destination: string;
	setDestination: Dispatch<SetStateAction<string>>;
	dates: DatesType[];
	setDates: Dispatch<SetStateAction<DatesType[]>>;
	options: OptionsType;
	setOptions: Dispatch<SetStateAction<OptionsType>>;
	// @ts-ignore
}>(null);

function SearchContextProvider({ children }: { children: ReactNode }) {
	const [destination, setDestination] = useState('');
	const [dates, setDates] = useState<DatesType[]>([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection'
		}
	]);
	const [options, setOptions] = useState<OptionsType>({
		adult: 1,
		children: 0,
		room: 1
	});

	return (
		<SearchContext.Provider
			value={{ destination, setDestination, dates, setDates, options, setOptions }}
		>
			{children}
		</SearchContext.Provider>
	);
}

const useSearch = () => useContext(SearchContext);

export { SearchContextProvider, useSearch };
