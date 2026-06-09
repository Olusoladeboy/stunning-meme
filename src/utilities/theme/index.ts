import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { PRIMARY_COLOR, SECOUNDARY_COLOR } from '../constant';

const buildTheme = (dark: boolean) => {
	let theme = createTheme({
		palette: {
			primary: {
				main: PRIMARY_COLOR,
				dark: '#141110',
				contrastText: '#CCD6DC',
			},
			secondary: {
				main: SECOUNDARY_COLOR,
			},
			text: {
				primary: dark ? grey[300] : PRIMARY_COLOR,
				secondary: SECOUNDARY_COLOR,
			},
			background: {
				paper: grey[50],
				default: grey[50],
			},
		},
		typography: {
			fontFamily: `'Qanelas', sans-serif`,
			body1: { fontSize: '16px' },
			body2: { fontSize: '12px' },
			button: {
				textTransform: 'initial',
				fontSize: '14px',
			},
			h1: {
				fontWeight: 700,
				fontSize: '24px',
			},
			h2: {
				fontWeight: 700,
				fontSize: '20px',
			},
			h3: {
				fontWeight: 600,
				fontSize: '18px',
			},
			h4: {
				fontWeight: 600,
				fontSize: '14px',
			},
			h5: {
				fontWeight: 500,
				fontSize: '12px',
			},
			h6: {
				fontWeight: 500,
				fontSize: '10px',
			},
		},
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 900,
				lg: 1200,
				xl: 1536,
			},
		},
		spacing: 4,
	});

	// Now extend with breakpoints properly
	theme.typography.h1 = {
		...theme.typography.h2,
		[theme.breakpoints.up('sm')]: { fontSize: '28px' },
		[theme.breakpoints.up('md')]: { fontSize: '32px' },
		[theme.breakpoints.up('lg')]: { fontSize: '38px' },
	};

	theme.typography.h2 = {
		...theme.typography.h2,
		[theme.breakpoints.up('sm')]: { fontSize: '24px' },
		[theme.breakpoints.up('md')]: { fontSize: '28px' },
		[theme.breakpoints.up('lg')]: { fontSize: '32px' },
	};

	theme.typography.h3 = {
		...theme.typography.h3,
		[theme.breakpoints.up('sm')]: { fontSize: '20px' },
		[theme.breakpoints.up('md')]: { fontSize: '34px' },
		[theme.breakpoints.up('lg')]: { fontSize: '28px' },
	};

	theme.typography.h4 = {
		...theme.typography.h4,
		[theme.breakpoints.up('sm')]: { fontSize: '16px' },
		[theme.breakpoints.up('md')]: { fontSize: '20px' },
		[theme.breakpoints.up('lg')]: { fontSize: '24px' },
	};

	theme.typography.h5 = {
		...theme.typography.h5,
		[theme.breakpoints.up('sm')]: { fontSize: '14px' },
		[theme.breakpoints.up('md')]: { fontSize: '16px' },
		[theme.breakpoints.up('lg')]: { fontSize: '20px' },
	};

	theme.typography.h6 = {
		...theme.typography.h6,
		[theme.breakpoints.up('sm')]: { fontSize: '12px' },
		[theme.breakpoints.up('md')]: { fontSize: '14px' },
		[theme.breakpoints.up('lg')]: { fontSize: '18px' },
	};

	return theme;
};

export default buildTheme;
