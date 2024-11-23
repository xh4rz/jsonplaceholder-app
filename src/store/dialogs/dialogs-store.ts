import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
	addDialog: boolean;
	editDialog: boolean;
	deleteDialog: boolean;
	setAddDialog: (state: boolean) => void;
}

export const useDialogsStore = create<State>()(
	devtools((set) => ({
		addDialog: false,
		editDialog: false,
		deleteDialog: false,

		setAddDialog: (state) => {
			set({ addDialog: state });
		}
	}))
);
