'use client';

import { useState, useMemo } from 'react';
import { useUsersStore } from '@/store/users/users-store';
import {
	Box,
	CircularProgress,
	Paper,
	Table,
	TableBody,
	TableContainer,
	TablePagination,
	Typography
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { red } from '@mui/material/colors';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { EnhancedTableHead, RowUsers } from '@/components/users/Table';
import type { HeadCell, Order, UserStore } from '@/ts';

const tableRowStyle = {
	minWidth: 750,
	'& th': {
		border: `1px solid white`,
		color: 'white'
	}
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells: readonly HeadCell[] = [
	{
		id: 'id',
		label: 'ID'
	},
	{
		id: 'name',
		label: 'Name'
	},
	{
		id: 'email',
		label: 'Email'
	},
	{
		id: 'city',
		label: 'City'
	},
	{
		id: 'phone',
		label: 'Phone'
	},
	{
		id: 'website',
		label: 'Website'
	},
	{
		id: '',
		label: 'Opciones'
	}
];

export const TableUsers = () => {
	const { users: rows, loadingUsers: loading } = useUsersStore();

	const [order, setOrder] = useState<Order>('asc');

	const [orderBy, setOrderBy] = useState<keyof UserStore>('id');

	const [page, setPage] = useState(0);

	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof UserStore
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const visibleRows = useMemo(
		() =>
			rowsPerPage > 0
				? [...rows]

						.sort(getComparator(order, orderBy))
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				: rows,
		[rows, order, orderBy, page, rowsPerPage]
	);

	if (rows.length === 0 && loading) {
		return (
			<Box
				m={10}
				display="flex"
				justifyContent="center"
				flexDirection="column"
				alignItems="center"
			>
				<CircularProgress />
				<Typography variant="h5" gutterBottom>
					Cargando...
				</Typography>
			</Box>
		);
	}

	return (
		<Box>
			{rows.length !== 0 && (
				<TableContainer
					component={Paper}
					sx={{
						backgroundColor: 'transparent',
						border: '1px solid white'
					}}
				>
					<Table sx={tableRowStyle} size={'small'}>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							headCells={headCells}
						/>

						<TableBody>
							{visibleRows.map((i) => (
								<RowUsers key={i.id} i={i} headCells={headCells} />
							))}
						</TableBody>
					</Table>

					<TablePagination
						labelRowsPerPage="Registros por columnas"
						rowsPerPageOptions={[5, 10, 25, 50, { label: 'Todo', value: -1 }]}
						labelDisplayedRows={({ from, to, count }) =>
							`${from}-${to} de ${count}`
						}
						component="div"
						count={rows.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						ActionsComponent={TablePaginationActions}
					/>
				</TableContainer>
			)}

			{rows.length === 0 && (
				<Box
					m={10}
					display="flex"
					justifyContent="center"
					flexDirection="column"
					alignItems="center"
				>
					<WarningIcon sx={{ fontSize: 80, color: red[500] }} />
					<Typography align="center" variant="h6" color="secondary">
						No se ha encontrado información.
					</Typography>
				</Box>
			)}
		</Box>
	);
};
