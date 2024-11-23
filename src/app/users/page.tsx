'use client';

import { useEffect } from 'react';
import { useUsersStore } from '@/store/users/users-store';
import { DialogUsers, TableUsers } from './ui';
import { CustomPaper } from '@/components/ui';
import PeopleIcon from '@mui/icons-material/People';

export default function UsersPage() {
	const { getUsers } = useUsersStore();

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<CustomPaper title="Usuarios" icon={PeopleIcon} sx={{ width: 1500 }}>
			<TableUsers />
			<DialogUsers />
		</CustomPaper>
	);
}
