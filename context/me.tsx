import { createContext, ReactNode, useContext } from 'react';
import { useQuery, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { getMe } from '../lib/api';
import { Me, QueryKeys } from '../types';

const MeContext = createContext<{
	user: Me;
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => any;
	// @ts-ignore
}>(null);

function MeContextProvider({ children }: { children: ReactNode }) {
	const { data, isLoading, refetch } = useQuery(QueryKeys.me, getMe);

	return (
		<MeContext.Provider value={{ user: data, refetch }}>
			{isLoading ? <p>Loading</p> : children}
		</MeContext.Provider>
	);
}

const useMe = () => useContext(MeContext);

export { MeContextProvider, useMe };
