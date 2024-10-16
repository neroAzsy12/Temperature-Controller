import express from "express";
import {
    getCabinetStatus,
    getInitialConfigurableCabinetSettings
} from "../controllers/cabinet.controller.js";

const router = express.Router();

router.get("/:raspberryDeviceId/:rs485DeviceId/cabinet/status", getCabinetStatus);
router.get("/:raspberryDeviceId/:rs485DeviceId/cabinet/configurable-settings", getInitialConfigurableCabinetSettings);

export default router;