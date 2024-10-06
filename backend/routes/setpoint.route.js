import express from "express";
import {
    readSetpoint,
    setSetpoint,
    readMinSetpoint,
    setMinSetpoint,
    readMaxSetpoint,
    setMaxSetpoint
} from "../controllers/setpoint.controller.js";

const router = express.Router();

router.get("/:raspberryDeviceId/:rs485DeviceId/setpoint", readSetpoint);
router.post("/:raspberryDeviceId/:rs485DeviceId/setpoint", setSetpoint);
router.get("/:raspberryDeviceId/:rs485DeviceId/setpoint/min", readMinSetpoint);
router.post("/:raspberryDeviceId/:rs485DeviceId/setpoint/min", setMinSetpoint);
router.get("/:raspberryDeviceId/:rs485DeviceId/setpoint/max", readMaxSetpoint);
router.post("/:raspberryDeviceId/:rs485DeviceId/setpoint/max", setMaxSetpoint);

export default router;