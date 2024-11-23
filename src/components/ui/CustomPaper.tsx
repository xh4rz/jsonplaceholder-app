'use client';

import { Box, Paper, SvgIconTypeMap, SxProps, Typography } from '@mui/material';
import { thirdColor } from '../themeRegistry/theme';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { IconType } from 'react-icons';

interface Props {
	children: React.ReactNode;
	title: string;
	icon:
		| IconType
		| (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
				muiName: string;
		  });
	sx?: SxProps;
}

export const CustomPaper = ({ children, title, icon: Icon, sx }: Props) => {
	return (
		<Paper
			variant="elevation"
			sx={{
				borderRadius: 2,
				mb: 2,
				...sx
			}}
		>
			<Box
				sx={{
					backgroundColor: 'grey',
					borderTopLeftRadius: 6,
					borderTopRightRadius: 6
				}}
				p={1}
				display="flex"
				gap={1}
			>
				{Icon && (
					<Icon
						style={{
							display: 'flex',
							justifyContent: 'center',
							color: thirdColor,
							fontSize: 30
						}}
					/>
				)}

				<Typography
					display="flex"
					alignItems="center"
					color="white"
					width="100%"
					justifyContent="center"
				>
					{title}
				</Typography>
			</Box>

			<Box p={5}>{children}</Box>
		</Paper>
	);
};

export default CustomPaper;
