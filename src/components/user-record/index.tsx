import React from 'react';
import { grey } from '@mui/material/colors';
import { Box, useTheme } from '@mui/material';
import RecordItem from './record-item';
import {
	BOX_SHADOW,
	SUCCESS_COLOR,
	DANGER_COLOR,
} from '../../utilities/constant';
import LINKS from '../../utilities/links';

const UserRecords = () => {
	const theme = useTheme();
	const styles = useStyles(theme);
	return (
		<Box
			sx={{
				':after': {
					content: '""',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					backgroundColor: grey[50],
					height: '70px',
					width: '70px',
					borderRadius: '40%',
				},
			}}
			style={styles.container as any}
		>
			<RecordItem
				isBorderRight
				isBorderBottom
				textColor={SUCCESS_COLOR}
				text={'Verified Users'}
				value={'480'}
				isPaddingRight
				link={LINKS.Verification}
			/>
			<RecordItem
				isBorderLeft
				isBorderBottom
				textColor={DANGER_COLOR}
				text={'Unverified Users'}
				value={'10'}
				isPaddingLeft
			/>
			<RecordItem
				isBorderRight
				isBorderTop
				textColor={grey[800]}
				text={'Suspended Users'}
				value={'7'}
				isPaddingRight
				link={LINKS.Suspension}
			/>
			<RecordItem
				isBorderLeft
				isBorderTop
				textColor={grey[400]}
				text={'Deleted Users'}
				value={'3'}
				isPaddingLeft
			/>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	container: {
		border: `1px solid ${theme.palette.secondary.main}`,
		padding: '1.5rem 1rem',
		backgroundColor: grey[50],
		borderRadius: theme.spacing(2),
		boxShadow: BOX_SHADOW,
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		position: 'relative',
		// columnGap: '3rem',
		// rowGap: '1rem',
	},
});

export default UserRecords;
