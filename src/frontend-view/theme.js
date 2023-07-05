// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiInputLabel-root": {
						color: "gray", // Label color before focus
					},
					"& .MuiInputBase-input": {
						color: "gray", // Input text color
					},
					"& .MuiInput-underline:before": {
						borderBottomColor: "gray", // Underline color before focus
					},
					"& .MuiInput-underline:hover:before": {
						borderBottomColor: "gray", // Underline color on hover before focus
					},
					"& .MuiInput-underline.Mui-focused:before": {
						borderBottomColor: "warning.main", // Underline color after focus
					},
					"& .MuiInput-underline.Mui-focused .MuiInputLabel-root": {
						color: "warning.main", // Label color after focus
					},
				},
			},
		},
	},
});

export default theme;
