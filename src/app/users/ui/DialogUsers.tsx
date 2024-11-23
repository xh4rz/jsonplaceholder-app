import { CustomDialog } from '@/components/dialog/CustomDialog';
import { useDialogsStore } from '@/store/dialogs/dialogs-store';
import { useUsersStore } from '@/store/users/users-store';
import { useState } from 'react';
import { User } from '../../../ts/json-placeholder.interface';

export const DialogUsers = () => {
	const { addDialog, setAddDialog } = useDialogsStore();

	const { user } = useUsersStore();

	return (
		<div>
			<CustomDialog
				title="Editar Usuario"
				openDialog={addDialog}
				handleCloseDialog={() => setAddDialog(false)}
			>
				<p> {JSON.stringify(user)}</p>
				{/* <ContentUser user={user} setValidateUser={setValidateUser} /> */}
			</CustomDialog>
		</div>
	);
};
