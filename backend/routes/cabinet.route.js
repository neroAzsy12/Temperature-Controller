import express from "express";
import {
    getCabinetStatus,
    getTemperatures,
    setHy0Differential,
    setHy1Differential,
    setMinSetpoint,
    setMaxSetpoint,
    setSetpoint,
    turnStandbyModeOff,
    turnStandbyModeOn,
    turnCabinetLightsOn,
    turnCabinetLightsOff,
    turnDefrostCycleOn,
    turnDefrostCycleOff
} from "../controllers/cabinet.controller.js";

const router = express.Router();

router.get("/:kioskId/:rs485DeviceId/cabinet/status", getCabinetStatus);
router.get("/:kioskId/:rs485DeviceId/cabinet/temperatures", getTemperatures);
router.post("/:kioskId/:rs485DeviceId/cabinet/differential/hy0", setHy0Differential);
router.post("/:kioskId/:rs485DeviceId/cabinet/differential/hy1", setHy1Differential);
router.post("/:kioskId/:rs485DeviceId/cabinet/setpoint", setSetpoint);
router.post("/:kioskId/:rs485DeviceId/cabinet/setpoint/min", setMinSetpoint);
router.post("/:kioskId/:rs485DeviceId/cabinet/setpoint/max", setMaxSetpoint);
router.post("/:kioskId/:rs485DeviceId/cabinet/lights/on", turnCabinetLightsOn);
router.post("/:kioskId/:rs485DeviceId/cabinet/lights/off", turnCabinetLightsOff);
router.post("/:kioskId/:rs485DeviceId/cabinet/defrost/on", turnDefrostCycleOn);
router.post("/:kioskId/:rs485DeviceId/cabinet/defrost/off", turnDefrostCycleOff);
router.post("/:kioskId/:rs485DeviceId/cabinet/standby/on", turnStandbyModeOn);
router.post("/:kioskId/:rs485DeviceId/cabinet/standby/off", turnStandbyModeOff);
export default router;