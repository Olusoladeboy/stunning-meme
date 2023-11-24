import React, { CSSProperties } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { grey, red } from '@mui/material/colors';
import UserAvatarWithDetails from '../avatar-with-details/manager';
import Button from '../button';
import { ManagerTypes, QueryKeys, User, ADMIN_ROLE } from 'utilities';
import { deleteManager, deleteStaff } from 'api';
import { useHandleError, useAlert } from 'hooks';
import { useAppSelector } from 'store/hooks';

type Props = {
	managerDetail: User;
	handleEdit?: () => void;
	type?: ManagerTypes.Manager | ManagerTypes.Admin;
	callback?: () => void;
};

const ManagerDetails = ({
	managerDetail,
	handleEdit,
	type = ManagerTypes.Manager,
	callback,
}: Props) => {
	const alert = useAlert();
	const queryClient = useQueryClient();
	const handleError = useHandleError();
	const theme = useTheme();
	const styles = useStyles(theme);
	const { canCreateOrUpdateRecord } = useAppSelector(
		(store) => store.authState
	);

	const { isLoading: isDeletingManager, mutate: mutateDeleteManager } =
		useMutation(deleteManager, {
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						return alert({ message: response.message, type: 'error' });
				}

				alert({ message: 'Manager deleted successfully', type: 'success' });
				queryClient.invalidateQueries(QueryKeys.Managers);
				typeof callback !== 'undefined' && callback();
			},
		});

	const { isLoading: isDeletingStaff, mutate: mutateDeleteStaff } = useMutation(
		deleteStaff,
		{
			onSettled: (data, error) => {
				if (error) {
					const response = handleError({ error });
					if (response?.message)
						return alert({ message: response.message, type: 'error' });
				}

				alert({ message: 'Staff deleted successfully', type: 'success' });
				queryClient.invalidateQueries(QueryKeys.Staffs);
				typeof callback !== 'undefined' && callback();
			},
		}
	);

	const handleDelete = () => {
		if (type === ManagerTypes.Manager) {
			mutateDeleteManager(managerDetail.id as string);
		}

		if (type === ManagerTypes.Admin) {
			mutateDeleteStaff(managerDetail.id as string);
		}
	};

	return (
		<Box>
			<UserAvatarWithDetails user={managerDetail} />
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: '100%',
					marginTop: theme.spacing(3),
				}}
			>
				<Box>
					<Box sx={{ marginBottom: theme.spacing(3) }} style={styles.grid}>
						<Typography variant={'body1'}>Total Users</Typography>
						<Typography
							variant={'body1'}
						>{`${managerDetail.firstname} ${managerDetail.lastname}`}</Typography>
					</Box>
					<Box style={styles.grid}>
						<Typography variant={'body1'}>Phone number</Typography>
						<Typography variant={'body1'}>{managerDetail.phone}</Typography>
					</Box>
				</Box>
				{canCreateOrUpdateRecord &&
					managerDetail?.role !== ADMIN_ROLE.SUPER_ADMIN && (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: theme.spacing(3),
							}}
						>
							<Button
								onClick={handleEdit}
								style={styles.editBtn as CSSProperties}
							>
								Edit profile
							</Button>
							<Button
								onClick={handleDelete}
								loading={isDeletingManager || isDeletingStaff}
								style={styles.deleteBtn as CSSProperties}
							>
								{type === ManagerTypes.Manager
									? 'Delete Manager'
									: 'Delete Admin'}
							</Button>
						</Box>
					)}
			</Box>
		</Box>
	);
};

const useStyles = (theme: any) => ({
	grid: {
		display: 'grid',
		gap: theme.spacing(3),
		gridTemplateColumns: '4fr 6fr',
	},
	deleteBtn: {
		border: `1px solid ${red[900]}`,
		color: red[900],
		textTransform: 'uppercase',
	},
	editBtn: {
		border: `1px solid ${theme.palette.secondary.main}`,
		backgroundColor: theme.palette.secondary.main,
		color: grey[50],
		textTransform: 'uppercase',
	},
});

export default ManagerDetails;
