import axios from "axios";
import { RASPBERRY_PI_IDs, RS485_DEVICE_IDs } from "../testData/test-data";

export const setHy0Differential = async(req, res) => {
    const raspberryPiId = req.params.raspberryDeviceId;
    const rs485DeviceId = req.params.rs485DeviceId;
    
    const { newHy0 } = req.body.differential;

    if (!raspberryPiId) {
        return res.status(400).json({ message: "Raspberry PI Device Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    if (!newHy0) {
        return res.status(400).json({ message: "HY0 Differential is required in the json body" });
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = RASPBERRY_PI_IDs[raspberryPiId];
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
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/compressor/hy0`, {
            data: {
                differential: newHy0
            },
            params: {
                unit: unit, // include the unit in the query params
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const readHy0Differential = async(req, res) => {
    const raspberryPiId = req.params.raspberryDeviceId;
    const rs485DeviceId = req.params.rs485DeviceId;

    if (!raspberryPiId) {
        return res.status(400).json({ message: "Raspberry PI Device Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = RASPBERRY_PI_IDs[raspberryPiId];
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
        const response = await axios.get(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/compressor/hy0`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const setHy1Differential = async(req, res) => {
    const raspberryPiId = req.params.raspberryDeviceId;
    const rs485DeviceId = req.params.rs485DeviceId;
    
    const { newHy1 } = req.body.differential;

    if (!raspberryPiId) {
        return res.status(400).json({ message: "Raspberry PI Device Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    if (!newHy1) {
        return res.status(400).json({ message: "HY1 Differential is required in the json body" });
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = RASPBERRY_PI_IDs[raspberryPiId];
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
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/compressor/hy1`, {
            data: {
                differential: newHy1
            },
            params: {
                unit: unit, // include the unit in the query params
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const readHy1Differential = async(req, res) => {
    const raspberryPiId = req.params.raspberryDeviceId;
    const rs485DeviceId = req.params.rs485DeviceId;

    if (!raspberryPiId) {
        return res.status(400).json({ message: "Raspberry PI Device Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = RASPBERRY_PI_IDs[raspberryPiId];
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
        const response = await axios.get(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/compressor/hy1`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}