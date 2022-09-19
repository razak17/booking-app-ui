import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MeContextProvider } from '../context/me';

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
				<Component {...pageProps} />
			</MeContextProvider>
			<ReactQueryDevtools initialIsOpen />
		</QueryClientProvider>
	);
}

export default MyApp;
