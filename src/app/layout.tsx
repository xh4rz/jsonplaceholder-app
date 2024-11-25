import type { Metadata } from 'next';
import Providers from '@/components/themeRegistry/Providers';
import { MainLayout } from '@/components/ui';

export const metadata: Metadata = {
	title: 'jsonplaceholder App',
	description: 'Aplicación de usuarios jsonplaceholder'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body>
				<Providers>
					<MainLayout>{children}</MainLayout>
				</Providers>
			</body>
		</html>
	);
}
