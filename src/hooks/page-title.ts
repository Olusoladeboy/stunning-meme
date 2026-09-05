import { useEffect } from 'react';

const usePageTitle = (title?: string) => {
	useEffect(() => {
		document.title = title
			? `${title} | Airtimeflip Admin`
			: 'Airtimeflip Admin';
	}, [title]);
};

export default usePageTitle;
