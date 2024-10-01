import express from "express";
import {
    getTemperatureT1,
    getTemperatureT2,
    getT2ProbeStatus,
    enableT2Probe,
    disableT2Probe
} from "../controllers/probe.controller";

const router = express.Router();

router.get("/:raspberryDeviceId/:rs485DeviceId/temperature/t1", getTemperatureT1);
router.get("/:raspberryDeviceId/:rs485DeviceId/temperature/t2", getTemperatureT2);
router.get("/:raspberryDeviceId/:rs485DeviceId/status/t1", getT2ProbeStatus);
router.post("/:raspberryDeviceId/:rs485DeviceId/enable/t2", enableT2Probe);
router.post("/:raspberryDeviceId/:rs485DeviceId/disable/t2", disableT2Probe);

export default router;