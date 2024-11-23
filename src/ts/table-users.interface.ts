import { UserStore } from './';

export interface HeadCell {
	id: keyof UserStore | '';
	label: string;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof UserStore
	) => void;
	order: Order;
	orderBy: string;
	headCells: readonly HeadCell[];
}
