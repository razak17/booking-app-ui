import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MeContextProvider } from '../context/me';
import { SearchContextProvider } from '../context/search';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<MeContextProvider>
				<SearchContextProvider>
					<Component {...pageProps} />
				</SearchContextProvider>
			</MeContextProvider>
			<ReactQueryDevtools initialIsOpen />
		</QueryClientProvider>
	);
}

export default MyApp;
