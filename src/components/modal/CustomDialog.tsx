import { forwardRef, ReactElement, Ref } from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogProps,
	DialogTitle,
	Grid2,
	IconButton,
	Slide
} from '@mui/material';
// import { CustomButton } from '../form';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { secondaryColor } from '../themeRegistry/theme';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement<any, any>;
	},
	ref: Ref<unknown>
) {
	return (
		<Slide
			direction="down"
			ref={ref}
			{...props}
			timeout={{ enter: 500, exit: 500 }}
		/>
	);
});
interface Props {
	title: 'string';
	openDialog: boolean;
	handleCloseDialog: () => void;
	optionsButtons: boolean;
	maxWidth: DialogProps['maxWidth'];
	fullScreen: boolean;
	children: JSX.Element;
}

export const CustomDialog = ({
	title,
	openDialog,
	handleCloseDialog,
	optionsButtons = true,
	maxWidth = 'sm',
	fullScreen = false,
	children
}: Props) => {
	return (
		<Dialog
			onClose={handleCloseDialog}
			open={openDialog}
			fullWidth
			maxWidth={maxWidth}
			TransitionComponent={Transition}
			fullScreen={fullScreen}
		>
			<DialogTitle
				sx={{
					m: 0,
					p: 2,
					bgcolor: secondaryColor,
					textAlign: 'center',
					color: 'white'
				}}
			>
				{title}
			</DialogTitle>
			<IconButton
				onClick={handleCloseDialog}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: 'red'
				}}
			>
				<CloseIcon />
			</IconButton>

			<DialogContent
				dividers
				sx={{ display: 'flex', justifyContent: 'center' }}
			>
				{children}
			</DialogContent>

			{/* {optionsButtons && (
				<DialogActions>
					<Grid container spacing={2} justifyContent="center">
						<Grid item xs={4}>
							<CustomButton
								title="Enviar"
								icon={SaveIcon}
								type="submit"
								form="dialog-form"
							/>
						</Grid>
						<Grid item xs={4}>
							<CustomButton
								title="Cancelar"
								icon={CloseIcon}
								onHandleClick={handleCloseDialog}
							/>
						</Grid>
					</Grid>
				</DialogActions>
			)} */}
		</Dialog>
	);
};
