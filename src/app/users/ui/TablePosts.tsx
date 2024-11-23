'use client';

import { useState, useEffect, useMemo } from 'react';
import { useUsersStore } from '@/store/users/users-store';
import {
	Box,
	Pagination,
	Paper,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Typography
} from '@mui/material';
import {
	primaryColorRgb,
	secondaryColorRgb,
	thirdColor
} from '@/components/themeRegistry/theme';
import { Warning } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { visuallyHidden } from '@mui/utils';
import styled from '@emotion/styled';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';

type Order = 'asc' | 'desc';

interface Data {
	id: number;
	name: string;
	username: string;
	email: string;
	city: string;
	company: string;
	phone: string;
	website: string;
}

interface HeadCell {
	id: keyof Data;
	label: string;
}

interface EnhancedTableProps {
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => void;
	order: Order;
	orderBy: string;
}

const tableRowStyle = {
	minWidth: 750,
	'& th': {
		border: `1px solid white`,
		color: 'white'
	}
};

const StyledTableRow = styled(TableRow)(() => ({
	'&:nth-of-type(odd)': {
		backgroundColor: 'rgba(0, 43, 86, 0.1)'
	}
}));

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
		id: 'username',
		label: 'Username'
	},
	{
		id: 'email',
		label: 'Email'
	},
	{
		id: 'company',
		label: 'Company'
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
	}
];

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, onRequestSort } = props;

	const createSortHandler =
		(property: keyof Data) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead
			sx={{
				background: `linear-gradient(90deg, ${primaryColorRgb} 41%, ${secondaryColorRgb} 66%)`
			}}
		>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align="center"
						sortDirection={orderBy === headCell.id ? order : false}
					>
						{headCell.id ? (
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : 'asc'}
								onClick={createSortHandler(headCell.id)}
								sx={{
									'&.MuiTableSortLabel-root': {
										color: 'white'
									},
									'&.MuiTableSortLabel-root:hover': {
										color: thirdColor
									},
									'&.Mui-active': {
										color: thirdColor
									},
									'& .MuiTableSortLabel-icon': {
										color: `${thirdColor} !important`
									}
								}}
							>
								{headCell.label}
								{orderBy === headCell.id ? (
									<Box component="span" sx={visuallyHidden}>
										{order === 'desc'
											? 'sorted descending'
											: 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						) : (
							headCell.label
						)}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

export const TablePosts = () => {
	const { getUsers, users: rows, loadingUsers: loading } = useUsersStore();

	const [order, setOrder] = useState<Order>('asc');

	const [orderBy, setOrderBy] = useState<keyof Data>('id');

	const [page, setPage] = useState(0);

	const [rowsPerPage] = useState(10);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage - 1);
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

	useEffect(() => {
		getUsers();
	}, []);

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
						/>

						<TableBody>
							{visibleRows.map((i) => {
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
														key={param}
														align={[0].includes(index) ? 'center' : 'left'}
													>
														{param}
													</TableCell>
												))}

												{/* <TableCell align="center">
													<StyledTooltip
														title="Ver Información Detallada"
														placement="bottom"
													>
														<IconButton onClick={() => handleConsult(i.id)}>
															<RemoveRedEyeIcon color="secondary" />
														</IconButton>
													</StyledTooltip>
												</TableCell> */}
											</>
										)}

										{loading &&
											headCells.map((i, index) => (
												<TableCell key={index} sx={{ height: 53 }}>
													<Skeleton />
												</TableCell>
											))}
									</StyledTableRow>
								);
							})}
						</TableBody>
					</Table>

					{rows.length === 0 && (
						<Box
							m={10}
							display="flex"
							justifyContent="center"
							flexDirection="column"
							alignItems="center"
						>
							<Warning sx={{ fontSize: 80, color: red[500] }} />
							<Typography align="center" variant="h6" color="secondary">
								No se ha encontrado información.
							</Typography>
						</Box>
					)}
				</TableContainer>
			)}

			<Pagination
				onChange={handleChangePage}
				count={Math.ceil(rows.length / rowsPerPage)}
				showFirstButton
				showLastButton
			/>
		</Box>
	);
};
