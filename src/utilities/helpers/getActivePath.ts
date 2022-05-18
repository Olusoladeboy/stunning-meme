const getActiveLink = ({
	name,
	currentPath: pathname,
}: {
	name: string;
	currentPath: string;
}) => {
	const actualPathName = pathname.split('/')[1];
	const pathnameReg = new RegExp(name);
	const stripPath: any = pathname.substring(1);

	if (actualPathName === '' && name === 'dashboard') {
		return {
			path: 'home',
			isActive: true,
		};
	}
	if (stripPath.match(pathnameReg) && actualPathName === name) {
		return {
			path: stripPath.match(pathnameReg)[0],
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
