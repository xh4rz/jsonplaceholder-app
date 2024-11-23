import axiosClient from '@/axios/axiosClient';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { showToast, timeout } from '@/utils';
import type { User, UserStore } from '@/ts';

interface State {
	users: UserStore[];
	user: UserStore;
	loadingUsers: boolean;
	cleanUsers: () => void;
	getUsers: () => Promise<void>;
	getUserById: (idUser: number) => Promise<void>;
}

export const useUsersStore = create<State>()(
	devtools((set) => ({
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

					showToast('Se ha encontrado información.', 'success');
				} else {
					set({ users: [] });

					showToast('No se ha encontrado información.', 'error');
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
		getUserById: async (idUser) => {
			try {
				const {
					data: { id, name, email, address, phone, website }
				} = await axiosClient.get<User>(`/users/${idUser}`);

				set({
					user: {
						id,
						name,
						email,
						city: address.city,
						phone,
						website
					}
				});

				showToast(`Se ha encontrado información con el Id: ${id}`, 'success');
			} catch (error) {
				showToast('No se ha encontrado información.', 'error');
			}
		},
		cleanUsers: () => {
			set({ users: [] });
		}
	}))
);
