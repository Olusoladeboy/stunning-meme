const getActiveLink = ({
	name,
	currentPath: pathname,
}: {
	name: string;
	currentPath: string;
}) => {
	const actualPathName = pathname.split('/')[1];

	const url_path = window && window.location.pathname;
	const regExp = new RegExp(name, 'ig');

	const match = url_path.match(regExp);

	if (actualPathName === '' && name === 'dashboard') {
		return {
			path: 'home',
			isActive: true,
		};
	}
	if (match && Array.isArray(match) && match[0] === name) {
		return {
			isActive: true,
		};
	} else {
		return {
			path: null,
			isActive: false && pathname.split('/')[1],
		};
	}
};

export default getActiveLink;
