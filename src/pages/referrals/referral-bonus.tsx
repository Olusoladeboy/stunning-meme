import React, { useState } from 'react';
import { styled, Box } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import {
	BorderContainer,
	Layout,
	ReferralBonusTable,
	TableHeader,
	ReferralBonusForm,
	Button,
	ModalWrapper,
	Pagination,
} from 'components';
import { QueryKeys, REFERRAL_BONUS } from 'utilities';
import { useQuery } from 'react-query';
import { settings } from 'api';
import { usePageTitle } from 'hooks';

const ReferralBonus = () => {
	usePageTitle('Referral Bonus');
	const [isDisplayForm, setDisplayForm] = useState<boolean>(false);

	const { isLoading, data: dataSettings } = useQuery(
		[QueryKeys.Settings],
		() =>
			settings({
				name: REFERRAL_BONUS,
			}),
		{
			refetchOnWindowFocus: false,
		}
	);

	return (
		<Layout>
			{isDisplayForm && (
				<ModalWrapper
					hasCloseButton
					closeModal={() => setDisplayForm(false)}
					title={'CREATE REFERRAL'}
				>
					<ReferralBonusForm callback={() => setDisplayForm(false)} />
				</ModalWrapper>
			)}
			<BorderContainer>
				<Box sx={{ padding: '0px 1rem' }}>
					<TableHeader backButtonText={'Referral Bonus'} isDisplayBackButton />
					<Box
						sx={{
							justifyContent: 'flex-end',
							display: 'flex',
							marginTop: (theme) => theme.spacing(4),
						}}
					>
						{dataSettings && dataSettings.payload.length === 0 && (
							<CreateButton
								onClick={() => setDisplayForm(true)}
								startIcon={<AddCircle />}
							>
								Create Referral
							</CreateButton>
						)}
					</Box>
				</Box>
				<ReferralBonusTable
					isLoading={isLoading}
					data={dataSettings && dataSettings.payload}
				/>
				<Pagination
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						marginTop: (theme) => theme.spacing(4),
						marginRight: '1rem',
					}}
					size={'large'}
					shape={'rounded'}
					variant={'outlined'}
				/>
			</BorderContainer>
		</Layout>
	);
};

const CreateButton = styled(Button)(({ theme }) => ({
	border: `1px solid ${theme.palette.secondary.main}`,
	color: theme.palette.secondary.main,
}));

export default ReferralBonus;
