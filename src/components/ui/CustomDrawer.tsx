'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	SvgIconTypeMap,
	Typography,
	styled,
	useTheme
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { FaUserClock } from 'react-icons/fa';
import { MdContentPasteSearch } from 'react-icons/md';
import type { IconType } from 'react-icons';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import { primaryColor, thirdColor } from '../themeRegistry/theme';

const drawerWidth = 330;

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

interface Props {
	openDrawer: boolean;
	setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IList {
	id: number;
	title: string;
	icon:
		| IconType
		| (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
				muiName: string;
		  });
	href: string;
}

export const CustomDrawer = ({ openDrawer, setOpenDrawer }: Props) => {
	const router = useRouter();

	const theme = useTheme();

	const handleDrawerClose = () => {
		setOpenDrawer(false);
	};

	const [list] = useState<IList[]>([
		{
			id: 1,
			title: 'Usuarios',
			icon: MdContentPasteSearch,
			href: '/users'
		},
		{
			id: 2,
			title: 'Posts',
			icon: FaUserClock,
			href: '/posts'
		}
	]);

	const handleRouter = (href: string) => {
		router.push(href);
		setOpenDrawer(false);
	};

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box'
				}
			}}
			variant="temporary"
			anchor="left"
			open={openDrawer}
			onClose={() => setOpenDrawer(false)}
		>
			<DrawerHeader>
				<Typography
					color="primary"
					variant="h6"
					fontWeight="bold"
					align="center"
					flex={1}
				>
					JSONPLACEHOLDER APP
				</Typography>

				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'ltr' ? (
						<ChevronLeftIcon />
					) : (
						<ChevronRightIcon />
					)}
				</IconButton>
			</DrawerHeader>

			<Divider />

			<List sx={{ mt: -1 }}>
				{list.map(({ id, title, icon: Icon, href }) => {
					return (
						<Box key={id}>
							<ListItemButton onClick={() => handleRouter(href)}>
								<ListItemIcon>
									<Box
										style={{
											display: 'flex',
											borderRadius: '50%',
											backgroundColor: thirdColor
										}}
									>
										<Icon
											style={{
												fontSize: 40,
												color: primaryColor,
												padding: 4
											}}
										/>
									</Box>
								</ListItemIcon>
								<ListItemText primary={title} />
							</ListItemButton>
							<Divider />
						</Box>
					);
				})}
			</List>
		</Drawer>
	);
};
