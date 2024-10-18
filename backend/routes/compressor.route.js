import express from "express";
import {
    readHy0Differential,
    setHy0Differential,
    readHy1Differential,
    setHy1Differential
 } from "../controllers/compressor.controller.js";

const router = express.Router();
router.get("/hy0/:raspberryDeviceId/:rs485DeviceId", readHy0Differential);
router.post("/hy0/:raspberryDeviceId/:rs485DeviceId", setHy0Differential);
router.get("/hy1/:raspberryDeviceId/:rs485DeviceId", readHy1Differential);
router.post("/hy1/:raspberryDeviceId/:rs485DeviceId", setHy1Differential);

export default router;