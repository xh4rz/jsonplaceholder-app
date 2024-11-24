import { Button, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface Props {
	title: string;
	icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
		muiName: string;
	};
	type?: 'reset' | 'submit' | 'button';
	variant?: 'contained' | 'outlined' | 'text';
	color?: 'primary' | 'secondary' | 'error';
	onHandleClick?: () => void;
}

export const CustomButton = ({
	title,
	icon: Icon,
	type = 'button',
	variant = 'contained',
	color = 'primary',
	onHandleClick = () => {}
}: Props) => {
	return (
		<Button
			fullWidth
			variant={variant}
			type={type}
			color={color}
			sx={{
				textTransform: 'capitalize'
			}}
			startIcon={<Icon />}
			onClick={onHandleClick}
		>
			{title}
		</Button>
	);
};
