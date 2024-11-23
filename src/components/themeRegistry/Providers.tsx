'use client';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import theme from './theme';
import 'react-toastify/dist/ReactToastify.css';

const StyledContainer = styled(ToastContainer)`
	.Toastify__toast {
		border-radius: 15px;
		width: max-content;
		color: white;
	}

	.Toastify__toast--success {
		background-color: #297190;
	}

	.Toastify__toast--warning {
		background-color: #ffa900;
	}

	.Toastify__toast--error {
		background-color: #c0392b;
	}
`;

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<StyledContainer />
			{children}
		</ThemeProvider>
	);
}
