import React, { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Typography,
	BoxProps,
	Popper,
	List,
	ListItemButton,
	ClickAwayListener,
	useTheme,
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import Search from '../form-components/search-input';
import { grey } from '@mui/material/colors';
import { BOX_SHADOW, LINKS } from '../../utilities';

interface Props extends BoxProps {
	title?: any;
	handleSearch?: (value: string) => void;
	clearSearch?: () => void;
}

const ManagerTableHeader = ({
	title,
	sx,
	style,
	clearSearch,
	handleSearch,
}: Props) => {
	const theme = useTheme();
	const styles = useStyles(theme);
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleClick = (e: MouseEvent<HTMLElement>) =>
		setAnchorEl(anchorEl ? null : e.currentTarget);

	const handleClickLink = (link: string) => {
		setAnchorEl(null);
		navigate(link);
	};

	return (
		<Box
			style={style}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '10px 0px',
				...sx,
			}}
		>
			<ClickAwayListener onClickAway={() => setAnchorEl(null)}>
				<Box>
					<Box style={styles.titleButtonWrapper} onClick={handleClick}>
						<Typography sx={{ fontWeight: '600' }} variant={'h5'}>
							{title}
						</Typography>
						<ArrowDropDown />
					</Box>

					<Popper anchorEl={anchorEl} open={Boolean(anchorEl)}>
						<List style={styles.list}>
							<ListItemButton onClick={() => handleClickLink(LINKS.Managers)}>
								Manager
							</ListItemButton>
							<ListItemButton
								onClick={() => handleClickLink(`${LINKS.Managers}/admin`)}
							>
								Admin
							</ListItemButton>
						</List>
					</Popper>
				</Box>
			</ClickAwayListener>
			<Box sx={{ maxWidth: '360px', width: '100%' }}>
				<Search
					fullWidth
					placeholder={'Search manager by email...'}
					handleSearch={handleSearch}
					clearSearch={clearSearch}
				/>
			</Box>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	titleButtonWrapper: {
		display: 'flex',
		alignItems: 'center',
		gap: theme.spacing(1),
		cursor: 'pointer',
	},
	button: {
		color: grey[50],
		backgroundColor: theme.palette.secondary.main,
	},
	list: {
		backgroundColor: grey[50],
		boxShadow: BOX_SHADOW,
		marginTop: theme.spacing(2),
	},
});

export default ManagerTableHeader;
