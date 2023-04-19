import React from 'react';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import AllConversionIcon from '../icons/conversion';
import PendingIcon from '../icons/time';
import ApprovedIcon from '../icons/check-three';
import SuspensionIcon from '../icons/suspension';
import TransactionItem from '../transaction-item';
import { SECOUNDARY_COLOR, TRANSACTIONS_TAB } from '../../utilities';
import { useAppSelector } from '../../store/hooks';

interface Props {
	currentTab?: string;
	changeCurrentTab?: (tab?: string) => void;
}

const TransactionsTab: React.FC<Props> = ({ currentTab, changeCurrentTab }) => {
	const { statistics } = useAppSelector((store) => store.appState);
	const handleChangeTab = (value?: string) => {
		if (typeof changeCurrentTab !== 'undefined') {
			changeCurrentTab(value);
		}
	};
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: 'repeat(5, 1fr)',
				gap: (theme) => theme.spacing(3),
				overflow: 'auto',
			}}
		>
			<TransactionItem
				isBorder
				borderColor={SECOUNDARY_COLOR}
				onClick={() => handleChangeTab()}
				bgColor={
					currentTab === TRANSACTIONS_TAB.ALL ? SECOUNDARY_COLOR : undefined
				}
				amount={statistics ? statistics.total_transactions : '0'}
				amountColor={
					currentTab === TRANSACTIONS_TAB.ALL ? grey[50] : SECOUNDARY_COLOR
				}
				icon={
					<AllConversionIcon
						color={
							currentTab === TRANSACTIONS_TAB.ALL ? grey[50] : SECOUNDARY_COLOR
						}
					/>
				}
			>
				<Typography
					sx={{
						color:
							currentTab === TRANSACTIONS_TAB.ALL ? grey[50] : SECOUNDARY_COLOR,
					}}
					variant={'body1'}
				>
					Total Conversions
				</Typography>
			</TransactionItem>
			<TransactionItem
				onClick={() => handleChangeTab(TRANSACTIONS_TAB.SUCCESSFUL)}
				isBorder
				borderColor={SECOUNDARY_COLOR}
				bgColor={
					currentTab === TRANSACTIONS_TAB.SUCCESSFUL
						? SECOUNDARY_COLOR
						: undefined
				}
				amountColor={
					currentTab === TRANSACTIONS_TAB.SUCCESSFUL
						? grey[50]
						: SECOUNDARY_COLOR
				}
				amount={statistics ? statistics.total_verified_users : '0'}
				icon={
					<ApprovedIcon
						color={
							currentTab === TRANSACTIONS_TAB.SUCCESSFUL
								? grey[50]
								: SECOUNDARY_COLOR
						}
					/>
				}
			>
				<Typography
					sx={{
						color:
							currentTab === TRANSACTIONS_TAB.SUCCESSFUL
								? grey[50]
								: SECOUNDARY_COLOR,
					}}
					variant={'body1'}
				>
					Approved Conversions
				</Typography>
			</TransactionItem>{' '}
			<TransactionItem
				isBorder
				onClick={() => handleChangeTab(TRANSACTIONS_TAB.PENDING)}
				bgColor={
					currentTab === TRANSACTIONS_TAB.PENDING ? SECOUNDARY_COLOR : undefined
				}
				borderColor={SECOUNDARY_COLOR}
				amountColor={
					currentTab === TRANSACTIONS_TAB.PENDING ? grey[50] : SECOUNDARY_COLOR
				}
				amount={statistics ? statistics.total_unverified_users : '0'}
				icon={
					<PendingIcon
						color={
							currentTab === TRANSACTIONS_TAB.PENDING
								? grey[50]
								: SECOUNDARY_COLOR
						}
					/>
				}
			>
				<Typography
					sx={{
						color:
							currentTab === TRANSACTIONS_TAB.PENDING
								? grey[50]
								: SECOUNDARY_COLOR,
					}}
					variant={'body1'}
				>
					Pending Conversions
				</Typography>
			</TransactionItem>{' '}
			<TransactionItem
				isBorder
				onClick={() => handleChangeTab(TRANSACTIONS_TAB.FAILED)}
				bgColor={
					currentTab === TRANSACTIONS_TAB.FAILED ? SECOUNDARY_COLOR : undefined
				}
				borderColor={SECOUNDARY_COLOR}
				amountColor={
					currentTab === TRANSACTIONS_TAB.FAILED ? grey[50] : SECOUNDARY_COLOR
				}
				amount={statistics ? statistics.total_suspended_users : '0'}
				icon={
					<SuspensionIcon
						color={
							currentTab === TRANSACTIONS_TAB.FAILED
								? grey[50]
								: SECOUNDARY_COLOR
						}
					/>
				}
			>
				<Typography
					sx={{
						color:
							currentTab === TRANSACTIONS_TAB.FAILED
								? grey[50]
								: SECOUNDARY_COLOR,
					}}
					variant={'body1'}
				>
					Declined Conversions
				</Typography>
			</TransactionItem>
		</Box>
	);
};

export default TransactionsTab;
