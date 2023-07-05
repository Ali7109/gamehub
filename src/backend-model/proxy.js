// const express = require("express");
// const cors = require("cors");
// const fetch = require("node-fetch");

// const app = express();
// app.use(cors());

// app.post("/api/games", async (req, res) => {
// 	try {
// 		const response = await fetch("https://api.igdb.com/v4/games", {
// 			method: "POST",
// 			headers: {
// 				Accept: "application/json",
// 				"Client-ID": process.env.CLIENT_ID,
// 				Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
// 			},
// 			body: req.body,
// 		});
// 		const data = await response.json();
// 		res.json(data);
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ error: "An error occurred" });
// 	}
// });

// const port = 8000; // Choose a suitable port number
// app.listen(port, () => {
// 	console.log(`Proxy server is running on port ${port}`);
// });
