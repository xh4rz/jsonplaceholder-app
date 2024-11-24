import axiosClient from '@/axios/axiosClient';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { showToast, timeout } from '@/utils';
import { useDialogsStore } from '../dialogs/dialogs-store';
import type { User, UserStore } from '@/ts';

interface State {
	users: UserStore[];
	user: UserStore;
	loadingUsers: boolean;
	userDeleteId: number;
	getUsers: () => Promise<void>;
	addUser: (data: UserStore) => Promise<void>;
	updateUser: (data: UserStore) => Promise<void>;
	deleteUser: () => Promise<void>;
	setUserEditId: (idUser: number) => void;
	setUserDeleteId: (idUser: number) => void;
}

export const useUsersStore = create<State>()(
	devtools((set, get) => ({
		users: [],
		user: {
			id: 0,
			name: '',
			email: '',
			city: '',
			phone: '',
			website: ''
		},
		loadingUsers: true,
		userDeleteId: 0,
		getUsers: async () => {
			try {
				const { data } = await axiosClient.get<User[]>('/users');

				if (data.length !== 0) {
					const dataUsers = data.map(
						({ id, name, email, address, phone, website }) => ({
							id,
							name,
							email,
							city: address.city,
							phone,
							website
						})
					);

					set({
						users: dataUsers
					});

					await timeout(2000);

					showToast('Se ha encontrado información de los usuarios.', 'success');
				} else {
					set({ users: [] });

					showToast(
						'No se ha encontrado información de los usuarios.',
						'error'
					);
				}
			} catch (error) {
				const err = error as AxiosError<Error>;

				if (!err.response?.data) {
					showToast(err.message, 'error');
				} else {
					showToast(err.response.data.message, 'error');
				}
			} finally {
				set({ loadingUsers: false });
			}
		},

		addUser: async (dataUser) => {
			try {
				const {
					data: { id, ...rest }
				} = await axiosClient.post<UserStore>(`/users`, dataUser);

				const { users } = get();

				const addUser = {
					id: users.length + 1,
					...rest
				};

				set({ users: [...users, addUser] });

				showToast(
					`Se ha agregado el usuario con el Id ${addUser.id}`,
					'success'
				);

				useDialogsStore.getState().setAddDialog(false);
			} catch (error) {
				showToast('No se ha podido actualizar el usuario.', 'error');
			}
		},

		setUserEditId: (idUser) => {
			const { users } = get();

			const findUser = users.find((i) => i.id === idUser);

			set({
				user: findUser
			});

			showToast(
				`Se ha encontrado información con el Id: ${findUser!.id}`,
				'success'
			);
		},

		updateUser: async (dataUser) => {
			try {
				const { data } = await axiosClient.put<UserStore>(
					`/users/${dataUser.id}`,
					dataUser
				);

				const { users } = get();

				const updateUsers = users.map((i) => {
					if (i.id === dataUser.id) {
						return data;
					}

					return i;
				});

				set({ users: updateUsers });

				showToast(
					`Se ha actualizado el usuario con el Id ${data.id}`,
					'success'
				);

				useDialogsStore.getState().setEditDialog(false);
			} catch (error) {
				showToast('No se ha podido actualizar el usuario.', 'error');
			}
		},

		setUserDeleteId: (idUser) => {
			set({ userDeleteId: idUser });
		},

		deleteUser: async () => {
			const { userDeleteId } = get();

			try {
				await axiosClient.delete(`/users/${userDeleteId}`);

				const { users } = get();

				const filterUsers = users.filter((i) => i.id !== userDeleteId);

				set({ users: filterUsers });

				showToast(`Se ha eliminado el usuario.`, 'success');

				useDialogsStore.getState().setDeleteDialog(false);
			} catch (error) {
				showToast('No se ha podido eliminar el usuario.', 'error');
			}
		}
	}))
);
