import express from "express";
import {
    getCabinetStatus,
    getTemperatures,
    turnStandbyOff,
    turnStandbyOn,
    turnCabinetLightsOn,
    turnCabinetLightsOff
} from "../controllers/cabinet.controller.js";

const router = express.Router();

router.get("/:raspberryDeviceId/:rs485DeviceId/cabinet/status", getCabinetStatus);
router.get("/:raspberryDeviceId/:rs485DeviceId/cabinet/temperatures", getTemperatures);
router.post("/:raspberryDeviceId/:rs485DeviceId/cabinet/standby/on", turnStandbyOn);
router.post("/:raspberryDeviceId/:rs485DeviceId/cabinet/standby/off", turnStandbyOff);
router.post("/:raspberryDeviceId/:rs485DeviceId/cabinet/light/on", turnCabinetLightsOn);
router.post("/:raspberryDeviceId/:rs485DeviceId/cabinet/light/off", turnCabinetLightsOff);
export default router;