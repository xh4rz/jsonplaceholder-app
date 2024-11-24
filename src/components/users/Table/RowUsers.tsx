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
		setUserEditId,
		setUserDeleteId
	} = useUsersStore();

	const { setEditDialog, setDeleteDialog } = useDialogsStore();

	const handleEditUser = (id: number) => {
		setEditDialog(true);
		setUserEditId(id);
	};

	const handleDeleteUser = (id: number) => {
		setDeleteDialog(true);
		setUserDeleteId(id);
	};

	return (
		<StyledTableRow
			key={i.id}
			sx={{
				'& td': {
					border: '1px solid rgb(235, 235, 228, 0.5)'
				}
			}}
		>
			{!loading && (
				<>
					{Object.values(i).map((param, index) => (
						<TableCell
							key={`${i.id}${param}`}
							align={index === 0 ? 'center' : 'left'}
						>
							{param}
						</TableCell>
					))}

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
