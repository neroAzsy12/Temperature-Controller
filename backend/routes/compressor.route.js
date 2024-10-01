import express from "express";
import {
    readHy0Differential,
    setHy0Differential,
    readHy1Differential,
    setHy1Differential
 } from "../controllers/compressor.controller";

const router = express.Router();
router.get("/:raspberryDeviceId/:rs485DeviceId/hy0", readHy0Differential);
router.post("/:raspberryDeviceId/:rs485DeviceId/hy0", setHy0Differential);
router.get("/:raspberryDeviceId/:rs485DeviceId/hy1", readHy1Differential);
router.post("/:raspberryDeviceId/:rs485DeviceId/hy1", setHy1Differential);

export default router;