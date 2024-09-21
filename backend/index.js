import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import chalk from "chalk";

import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const timelog = (req, res, next) => {
    const date = new Date();
    const GET = chalk.green;
    const POST = chalk.hex('#FF8800');
    const PUT = chalk.blue;
    const DELETE = chalk.red;

    console.log( (req.method == 'GET') ? GET(req.method) : (req.method == 'POST') ? POST(req.method) : (req.method == 'PUT') ? PUT(req.method) : DELETE(req.method), 'request at', chalk.blue(`${req.url}`), 'Time:', chalk.yellow(date.toLocaleString('en-US', { timeZoneName: 'short' })));
    next();
};
if (process.env.NODE_ENV === 'development') app.use(timelog);

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
});