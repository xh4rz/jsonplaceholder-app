import {
	Box,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import {
	primaryColorRgb,
	secondaryColorRgb,
	thirdColor
} from '../../themeRegistry/theme';
import type { EnhancedTableProps, UserStore } from '@/ts';

export const EnhancedTableHead = (props: EnhancedTableProps) => {
	const { order, orderBy, onRequestSort, headCells } = props;

	const createSortHandler =
		(property: keyof UserStore) => (event: React.MouseEvent<unknown>) => {
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
						colSpan={headCell.id ? 1 : 2}
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
};
