'use client';

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { CustomAppBar } from './';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box>
			<CustomAppBar />

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					mt: 5,
					mb: 5
				}}
			>
				{children}
			</Box>
		</Box>
	);
};
