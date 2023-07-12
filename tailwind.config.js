/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				white: "#FFFFFF",
				blue: "#1fb6ff",
				purple: "#7e5bef",
				"light-brown": "#373737",
				pink: "#ff49db",
				orange: "#ff7849",
				green: "#13ce66",
				"gray-dark": "#191B1F",
				gray: "#8492a6",
				"gray-light": "#626264",
				black: "#000000",
			},
			backgroundImage: {
				"dash-backdrop":
					"url('/src/frontend-view/images/gamingBackdrop.jpg')",
				"gh-logo": "url('/src/frontend-view/images/ghlogo.png')",
				"stock-profpic":
					"url('/src/frontend-view/images/StockImages/stockProfPic.jpg')",
				"stock-coverphoto":
					"url('/src/frontend-view/images/StockImages/stockCoverPic.jpg')",
			},
		},
	},
	variants: {},
	plugins: [],
};
