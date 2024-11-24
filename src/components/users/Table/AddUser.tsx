import { CustomButton } from '@/components/button/CustomButton';
import { useDialogsStore } from '@/store/dialogs/dialogs-store';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box } from '@mui/material';

export const AddUser = () => {
	const { setAddDialog } = useDialogsStore();

	const handleAddUser = () => {
		setAddDialog(true);
	};

	return (
		<Box display="flex" justifyContent="end" mb={2}>
			<Box>
				<CustomButton
					title={'Agregar Usuario'}
					icon={PersonAddIcon}
					onHandleClick={handleAddUser}
				/>
			</Box>
		</Box>
	);
};
