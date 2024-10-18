import React from 'react';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import AllTransactionIcon from '../icons/transaction';
import PendingIcon from '../icons/time';
import CompletedIcon from '../icons/check-two';
import FailedIcon from '../icons/failed';
import TransactionItem from '../transaction-item';
import { SEMI_GREEN_COLOR, CONVERSIONS_TAB } from 'utilities';
import { useAppSelector } from 'store/hooks';

interface Props {
	currentTab?: string;
	changeCurrentTab?: (tab?: string) => void;
}

const ConversionsTab: React.FC<Props> = ({ currentTab, changeCurrentTab }) => {
	const {
		appState: { statistics },
		authState: { canViewStatistics },
	} = useAppSelector((store) => store);
	const handleChangeTab = (value?: string) => {
		if (typeof changeCurrentTab !== 'undefined') {
			changeCurrentTab(value);
		}
	};

	if (canViewStatistics) {
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
					borderColor={SEMI_GREEN_COLOR}
					onClick={() => handleChangeTab()}
					bgColor={
						currentTab === CONVERSIONS_TAB.ALL ? SEMI_GREEN_COLOR : undefined
					}
					amount={statistics ? statistics.total_conversions : '0'}
					amountColor={
						currentTab === CONVERSIONS_TAB.ALL ? grey[50] : SEMI_GREEN_COLOR
					}
					icon={
						<AllTransactionIcon
							color={
								currentTab === CONVERSIONS_TAB.ALL ? grey[50] : SEMI_GREEN_COLOR
							}
						/>
					}
				>
					<Typography
						sx={{
							color:
								currentTab === CONVERSIONS_TAB.ALL
									? grey[50]
									: SEMI_GREEN_COLOR,
						}}
						variant={'body1'}
					>
						Total Transaction
					</Typography>
				</TransactionItem>
				<TransactionItem
					onClick={() => handleChangeTab(CONVERSIONS_TAB.APPROVED)}
					isBorder
					borderColor={SEMI_GREEN_COLOR}
					bgColor={
						currentTab === CONVERSIONS_TAB.APPROVED
							? SEMI_GREEN_COLOR
							: undefined
					}
					amountColor={
						currentTab === CONVERSIONS_TAB.APPROVED
							? grey[50]
							: SEMI_GREEN_COLOR
					}
					amount={statistics ? statistics.total_verified_users : '0'}
					icon={
						<CompletedIcon
							color={
								currentTab === CONVERSIONS_TAB.APPROVED
									? grey[50]
									: SEMI_GREEN_COLOR
							}
						/>
					}
				>
					<Typography
						sx={{
							color:
								currentTab === CONVERSIONS_TAB.APPROVED
									? grey[50]
									: SEMI_GREEN_COLOR,
						}}
						variant={'body1'}
					>
						Completed Transactions
					</Typography>
				</TransactionItem>{' '}
				<TransactionItem
					isBorder
					onClick={() => handleChangeTab(CONVERSIONS_TAB.PENDING)}
					bgColor={
						currentTab === CONVERSIONS_TAB.PENDING
							? SEMI_GREEN_COLOR
							: undefined
					}
					borderColor={SEMI_GREEN_COLOR}
					amountColor={
						currentTab === CONVERSIONS_TAB.PENDING ? grey[50] : SEMI_GREEN_COLOR
					}
					amount={statistics ? statistics.total_unverified_users : '0'}
					icon={
						<PendingIcon
							color={
								currentTab === CONVERSIONS_TAB.PENDING
									? grey[50]
									: SEMI_GREEN_COLOR
							}
						/>
					}
				>
					<Typography
						sx={{
							color:
								currentTab === CONVERSIONS_TAB.PENDING
									? grey[50]
									: SEMI_GREEN_COLOR,
						}}
						variant={'body1'}
					>
						Pending Transactions
					</Typography>
				</TransactionItem>{' '}
				<TransactionItem
					isBorder
					onClick={() => handleChangeTab(CONVERSIONS_TAB.DECLINED)}
					bgColor={
						currentTab === CONVERSIONS_TAB.DECLINED
							? SEMI_GREEN_COLOR
							: undefined
					}
					borderColor={SEMI_GREEN_COLOR}
					amountColor={
						currentTab === CONVERSIONS_TAB.DECLINED
							? grey[50]
							: SEMI_GREEN_COLOR
					}
					amount={statistics ? statistics.total_suspended_users : '0'}
					icon={
						<FailedIcon
							color={
								currentTab === CONVERSIONS_TAB.DECLINED
									? grey[50]
									: SEMI_GREEN_COLOR
							}
						/>
					}
				>
					<Typography
						sx={{
							color:
								currentTab === CONVERSIONS_TAB.DECLINED
									? grey[50]
									: SEMI_GREEN_COLOR,
						}}
						variant={'body1'}
					>
						Failed Transactions
					</Typography>
				</TransactionItem>
			</Box>
		);
	}

	return null;
};

export default ConversionsTab;
