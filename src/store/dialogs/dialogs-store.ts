import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
	addDialog: boolean;
	editDialog: boolean;
	deleteDialog: boolean;
	setAddDialog: (state: boolean) => void;
	setEditDialog: (state: boolean) => void;
	setDeleteDialog: (state: boolean) => void;
}

export const useDialogsStore = create<State>()(
	devtools((set) => ({
		addDialog: false,
		editDialog: false,
		deleteDialog: false,
		setAddDialog: (state) => {
			set({ addDialog: state });
		},
		setEditDialog: (state) => {
			set({ editDialog: state });
		},
		setDeleteDialog: (state) => {
			set({ deleteDialog: state });
		}
	}))
);
