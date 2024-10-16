import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import cabinetRoutes from "./routes/cabinet.route.js";
import setpointRoutes from "./routes/setpoint.route.js";
import standbyRoutes from "./routes/standby.route.js";
import compressorRoutes from "./routes/compressor.route.js";

dotenv.config()

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
	app.use(
		cors({
			origin: "http://localhost:5173",	// allow cross origin
			credentials: true,
		})
	);
}

app.use(express.json({ limit: "5mb" }));    // parse JSON request bodies
app.use(express.urlencoded({extended: false}))

app.use("/api/v1/cabinet", cabinetRoutes);
app.use("/api/v1/setpoints", setpointRoutes);
app.use("/api/v1/standby", standbyRoutes);
app.use("/api/v1/compressors", compressorRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
