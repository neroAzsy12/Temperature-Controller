import express from "express";
import {
    setStandbyMode,
    unsetStandbyMode
} from "../controllers/standby.controller.js";

const router = express.Router();

router.post("/:raspberryDeviceId/:rs485DeviceId/standby/on", setStandbyMode);
router.post("/:raspberryDeviceId/:rs485DeviceId/standby/off", unsetStandbyMode);

export default router;