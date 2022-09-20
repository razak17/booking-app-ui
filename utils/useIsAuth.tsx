import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMe } from '../context/me';

export const useIsAuth = () => {
	const { user, isLoading } = useMe();
	const router = useRouter();
	useEffect(() => {
		if (!isLoading && !user?.username) {
			router.replace('/login?next=' + router.pathname);
		}
	}, [isLoading, user, router]);
};
