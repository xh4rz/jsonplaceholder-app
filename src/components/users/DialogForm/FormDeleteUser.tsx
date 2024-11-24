import { useForm } from 'react-hook-form';
import { Grid2 as Grid, Typography } from '@mui/material';
import { CustomButton } from '@/components/button/CustomButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useUsersStore } from '@/store/users/users-store';
import { useDialogsStore } from '@/store/dialogs/dialogs-store';
import type { UserStore } from '@/ts';

export const FormDeleteUser = () => {
	const { userDeleteId, deleteUser } = useUsersStore();

	const { setDeleteDialog } = useDialogsStore();

	const { handleSubmit } = useForm<UserStore>({
		mode: 'onChange'
	});

	const onSubmit = () => {
		deleteUser();
	};

	const handleReset = () => {
		setDeleteDialog(false);
	};

	return (
		<Grid
			container
			justifyContent="center"
			spacing={2}
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			width="100%"
		>
			<Grid size={12} m={5}>
				<Typography align="center">
					¿Está seguro de eliminar el usuario con el Id {userDeleteId}?
				</Typography>
			</Grid>
			<Grid size={3}>
				<CustomButton title="Si" icon={CheckIcon} type="submit" />
			</Grid>

			<Grid size={3}>
				<CustomButton
					title="No"
					icon={CloseIcon}
					type="reset"
					color="error"
					onHandleClick={handleReset}
				/>
			</Grid>
		</Grid>
	);
};
