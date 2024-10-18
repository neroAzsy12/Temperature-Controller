import express from "express";
import {
    getCabinetStatus,
    getTemperatures,
    turnStandbyOff,
    turnStandbyOn
} from "../controllers/cabinet.controller.js";

const router = express.Router();

router.get("/:raspberryDeviceId/:rs485DeviceId/cabinet/status", getCabinetStatus);
router.get("/:raspberryDeviceId/:rs485DeviceId/cabinet/temperatures", getTemperatures);
router.post("/:raspberryDeviceId/:rs485DeviceId/cabinet/standby/on", turnStandbyOn);
router.post("/:raspberryDeviceId/:rs485DeviceId/cabinet/standby/off", turnStandbyOff);
export default router;