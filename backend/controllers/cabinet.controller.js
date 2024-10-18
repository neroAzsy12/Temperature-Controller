import axios from "axios";
import { RASPBERRY_PI_IDs, RS485_DEVICE_IDs } from "../testData/test-data.js";

export const getCabinetStatus = async(req, res) => {
    const raspberryPiId = req.params.raspberryDeviceId;
    const rs485DeviceId = req.params.rs485DeviceId;

    if (!raspberryPiId) {
        return res.status(400).json({ message: "Raspberry PI Device Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = RASPBERRY_PI_IDs[raspberryPiId]["url"];
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi Device not found." });
    }

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    const rs485Device = RS485_DEVICE_IDs[rs485DeviceId];
    if (!rs485Device) {
        const rs485DeviceRPI = RS485_DEVICE_IDs[rs485DeviceId][raspberryPiId]
        if (!rs485DeviceRPI || (rs485DeviceRPI && rs485DeviceRPI !== raspberryPiId)) {
            return res.status(404).json({ message: "RS485 Device not found." });
        }
    }

    const defaultUnit = 'C';                    // Default to Celsius
    const unit = req.query.unit || defaultUnit; // Get unit from query parameter or use default

    try {
        const response = await axios.get(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/cabinet/status`, {
            params: {
                unit: unit, // include the unit in the query params
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTemperatures = async(req, res) => {
    const raspberryPiId = req.params.raspberryDeviceId;
    const rs485DeviceId = req.params.rs485DeviceId;

    if (!raspberryPiId) {
        return res.status(400).json({ message: "Raspberry PI Device Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = RASPBERRY_PI_IDs[raspberryPiId]["url"];
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi Device not found." });
    }

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    const rs485Device = RS485_DEVICE_IDs[rs485DeviceId];
    if (!rs485Device) {
        const rs485DeviceRPI = RS485_DEVICE_IDs[rs485DeviceId][raspberryPiId]
        if (!rs485DeviceRPI || (rs485DeviceRPI && rs485DeviceRPI !== raspberryPiId)) {
            return res.status(404).json({ message: "RS485 Device not found." });
        }
    }

    const defaultUnit = 'C';                    // Default to Celsius
    const unit = req.query.unit || defaultUnit; // Get unit from query parameter or use default

    try {
        const response = await axios.get(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/cabinet/temperatures`, {
            params: {
                unit: unit, // include the unit in the query params
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const turnStandbyOn = async(req, res) => {
    const raspberryPiId = req.params.raspberryDeviceId;
    const rs485DeviceId = req.params.rs485DeviceId;

    if (!raspberryPiId) {
        return res.status(400).json({ message: "Raspberry PI Device Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = RASPBERRY_PI_IDs[raspberryPiId]["url"];
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi Device not found." });
    }

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    const rs485Device = RS485_DEVICE_IDs[rs485DeviceId];
    if (!rs485Device) {
        const rs485DeviceRPI = RS485_DEVICE_IDs[rs485DeviceId][raspberryPiId]
        if (!rs485DeviceRPI || (rs485DeviceRPI && rs485DeviceRPI !== raspberryPiId)) {
            return res.status(404).json({ message: "RS485 Device not found." });
        }
    }

    try {
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/cabinet/standby/on`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const turnStandbyOff = async(req, res) => {
    const raspberryPiId = req.params.raspberryDeviceId;
    const rs485DeviceId = req.params.rs485DeviceId;

    if (!raspberryPiId) {
        return res.status(400).json({ message: "Raspberry PI Device Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = RASPBERRY_PI_IDs[raspberryPiId]["url"];
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi Device not found." });
    }

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    const rs485Device = RS485_DEVICE_IDs[rs485DeviceId];
    if (!rs485Device) {
        const rs485DeviceRPI = RS485_DEVICE_IDs[rs485DeviceId][raspberryPiId]
        if (!rs485DeviceRPI || (rs485DeviceRPI && rs485DeviceRPI !== raspberryPiId)) {
            return res.status(404).json({ message: "RS485 Device not found." });
        }
    }

    try {
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/cabinet/standby/off`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}