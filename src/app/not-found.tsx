'use client';

import { useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { CustomButton } from '@/components/button/CustomButton';

export default function NotFoundPage() {
	const router = useRouter();

	return (
		<Box
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '80vh',
				flexDirection: 'column',
				textAlign: 'center',
				gap: 20
			}}
		>
			<Typography variant="h1" fontWeight="bold">
				404 | Página no encontrada
			</Typography>

			<Box>
				<CustomButton
					title="Volver a Usuarios"
					icon={ReplyAllIcon}
					onHandleClick={() => router.replace('/usuarios')}
				/>
			</Box>
		</Box>
	);
}
