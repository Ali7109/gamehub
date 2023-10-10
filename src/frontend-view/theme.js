import { createTheme } from "@mui/material/styles";

// Define your light mode colors
const lightModeColors = {
	labelColor: "gray",
	inputTextColor: "gray",
	underlineColorBeforeFocus: "gray",
	underlineColorOnHoverBeforeFocus: "gray",
	underlineColorAfterFocus: "warning.main",
	labelColorAfterFocus: "warning.main",
};

// Define your dark mode colors
const darkModeColors = {
	labelColor: "white",
	inputTextColor: "white",
	underlineColorBeforeFocus: "white",
	underlineColorOnHoverBeforeFocus: "white",
	underlineColorAfterFocus: "primary.main",
	labelColorAfterFocus: "primary.main",
};

// Create a function that generates the theme based on the current mode
const generateTheme = (isDarkMode) => {
	const colors = isDarkMode ? darkModeColors : lightModeColors;

	return createTheme({
		components: {
			MuiTextField: {
				styleOverrides: {
					root: {
						"& .MuiInputLabel-root": {
							color: colors.labelColor,
						},
						"& .MuiInputBase-input": {
							color: colors.inputTextColor,
						},
						"& .MuiInput-underline:before": {
							borderBottomColor: colors.underlineColorBeforeFocus,
						},
						"& .MuiInput-underline:hover:before": {
							borderBottomColor:
								colors.underlineColorOnHoverBeforeFocus,
						},
						"& .MuiInput-underline.Mui-focused:before": {
							borderBottomColor: colors.underlineColorAfterFocus,
						},
						"& .MuiInput-underline.Mui-focused .MuiInputLabel-root":
							{
								color: colors.labelColorAfterFocus,
							},
					},
				},
			},
		},
		// ...other theme configuration here
	});
};

export default generateTheme;
