import { CustomDialog } from '@/components/dialog/CustomDialog';
import {
	FormAddUser,
	FormDeleteUser,
	FormEditUser
} from '@/components/users/DialogForm';
import { useDialogsStore } from '@/store/dialogs/dialogs-store';

export const DialogUsers = () => {
	const {
		addDialog,
		setAddDialog,
		editDialog,
		setEditDialog,
		deleteDialog,
		setDeleteDialog
	} = useDialogsStore();

	return (
		<div>
			<CustomDialog
				title="Agregar Usuario"
				openDialog={addDialog}
				handleCloseDialog={() => setAddDialog(false)}
			>
				<FormAddUser />
			</CustomDialog>

			<CustomDialog
				title="Editar Usuario"
				openDialog={editDialog}
				handleCloseDialog={() => setEditDialog(false)}
			>
				<FormEditUser />
			</CustomDialog>

			<CustomDialog
				title="Eliminar Usuario"
				openDialog={deleteDialog}
				handleCloseDialog={() => setDeleteDialog(false)}
			>
				<FormDeleteUser />
			</CustomDialog>
		</div>
	);
};
