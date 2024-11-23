'use client';

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { CustomDrawer } from './';

const myEffect = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-200%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const CustomAppBar = () => {
	const [openDrawer, setOpenDrawer] = useState(false);

	const handleDrawerOpen = () => {
		setOpenDrawer(true);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ ...(openDrawer && { display: 'none' }) }}
					>
						<MenuIcon />
					</IconButton>

					<Typography
						noWrap
						variant="h6"
						component="div"
						fontWeight="bold"
						sx={{
							display: { xs: 'none', sm: 'block' },

							animation: `${myEffect} 3s`
						}}
					>
						JSONPLACEHOLDER APP
					</Typography>
				</Toolbar>
			</AppBar>

			<CustomDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
		</Box>
	);
};
