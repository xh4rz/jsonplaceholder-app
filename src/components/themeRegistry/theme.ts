import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#297190'
		},
		secondary: {
			main: '#b4711a'
		}
	},
	typography: {
		fontFamily:
			'-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"'
	}
});

const primaryColor = theme.palette.primary.main;
const secondaryColor = theme.palette.secondary.main;
const thirdColor = '#FFA900';

const primaryColorRgb = 'rgb(41, 113, 144)';
const secondaryColorRgb = 'rgb(180, 113, 26)';
const thirdColorRgb = 'rgb(255,169,0)';

export {
	primaryColor,
	secondaryColor,
	thirdColor,
	primaryColorRgb,
	secondaryColorRgb,
	thirdColorRgb
};

export default theme;
