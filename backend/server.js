import express from "express"
import dotenv from "dotenv";
import path from "path";

import probeRoutes from "./routes/probe.route";
import setpointRoutes from "./routes/setpoint.route";
import compressorRoutes from "./routes/compressor.route";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" }));    // parse JSON request bodies

app.use("/api/v1/probes", probeRoutes);
app.use("/api/v1/setpoints", setpointRoutes);
app.use("/api/v1/compressos", compressorRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
