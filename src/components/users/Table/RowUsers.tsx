import { useUsersStore } from '@/store/users/users-store';
import styled from '@emotion/styled';
import {
	IconButton,
	Skeleton,
	TableCell,
	TableRow,
	Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { HeadCell, UserStore } from '@/ts';
import { useDialogsStore } from '@/store/dialogs/dialogs-store';

const StyledTableRow = styled(TableRow)(() => ({
	'&:nth-of-type(odd)': {
		backgroundColor: 'rgba(0, 43, 86, 0.1)'
	}
}));

interface Props {
	i: UserStore;
	headCells: readonly HeadCell[];
}

export const RowUsers = ({ i, headCells }: Props) => {
	const {
		loadingUsers: loading,
		setUserEdit,
		setUserDeleteId
	} = useUsersStore();

	const { setEditDialog, setDeleteDialog } = useDialogsStore();

	const handleEditUser = (id: number) => {
		setEditDialog(true);
		setUserEdit(id);
	};

	const handleDeleteUser = (id: number) => {
		setDeleteDialog(true);
		setUserDeleteId(id);
	};

	return (
		<StyledTableRow
			sx={{
				'& td': {
					border: '1px solid rgb(235, 235, 228, 0.5)'
				}
			}}
		>
			{!loading && (
				<>
					<TableCell align="center">{i.id}</TableCell>
					<TableCell>{i.name}</TableCell>
					<TableCell>{i.email}</TableCell>
					<TableCell>{i.city}</TableCell>
					<TableCell>{i.phone}</TableCell>
					<TableCell>{i.website}</TableCell>

					<TableCell align="center">
						<Tooltip title="Editar Usuario" placement="left">
							<IconButton onClick={() => handleEditUser(i.id)}>
								<EditIcon color="primary" />
							</IconButton>
						</Tooltip>
					</TableCell>

					<TableCell align="center">
						<Tooltip title="Eliminar Usuario" placement="right">
							<IconButton onClick={() => handleDeleteUser(i.id)}>
								<DeleteIcon color={'error'} />
							</IconButton>
						</Tooltip>
					</TableCell>
				</>
			)}

			{loading &&
				headCells.map((i) => (
					<TableCell key={i.id} sx={{ height: 53 }}>
						<Skeleton />
					</TableCell>
				))}
		</StyledTableRow>
	);
};
