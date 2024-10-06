import axios from "axios";
import { RASPBERRY_PI_IDs, RS485_DEVICE_IDs } from "../testData/test-data.js";

export const setSetpoint = async(req, res) => {
    const raspberryPiId = req.params.raspberryDeviceId;
    const rs485DeviceId = req.params.rs485DeviceId;
    
    const { newSetpoint } = req.body.setpoint;

    if (!raspberryPiId) {
        return res.status(400).json({ message: "Raspberry PI Device Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    if (!newSetpoint) {
        return res.status(400).json({ message: "setpoint is required in the json body" });
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

    const defaultUnit = 'C';                    // Default to Celsius
    const unit = req.query.unit || defaultUnit; // Get unit from query parameter or use default

    try {
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/setpoint`, {
            data: {
                setpoint: newSetpoint
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

export const readSetpoint = async(req, res) => {
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

    const defaultUnit = 'C';                    // Default to Celsius
    const unit = req.query.unit || defaultUnit; // Get unit from query parameter or use default

    try {
        const response = await axios.get(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/setpoint`, {
            params: {
                unit: unit, // include the unit in the query params
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const setMinSetpoint = async(req, res) => {
    const raspberryPiId = req.params.raspberryDeviceId;
    const rs485DeviceId = req.params.rs485DeviceId;
    
    const { newMinSetpoint } = req.body.minSetpoint;

    if (!raspberryPiId) {
        return res.status(400).json({ message: "Raspberry PI Device Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    if (!newMinSetpoint) {
        return res.status(400).json({ message: "minimum setpoint is required in the json body" });
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

    const defaultUnit = 'C';                    // Default to Celsius
    const unit = req.query.unit || defaultUnit; // Get unit from query parameter or use default

    try {
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/setpoint/min`, {
            data: {
                min_setpoint: newMinSetpoint
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

export const readMinSetpoint = async(req, res) => {
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

    const defaultUnit = 'C';                    // Default to Celsius
    const unit = req.query.unit || defaultUnit; // Get unit from query parameter or use default

    try {
        const response = await axios.get(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/setpoint/min`, {
            params: {
                unit: unit, // include the unit in the query params
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const setMaxSetpoint = async(req, res) => {
    const raspberryPiId = req.params.raspberryDeviceId;
    const rs485DeviceId = req.params.rs485DeviceId;
    
    const { newMaxSetpoint } = req.body.maxSetpoint;

    if (!raspberryPiId) {
        return res.status(400).json({ message: "Raspberry PI Device Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    if (!newMaxSetpoint) {
        return res.status(400).json({ message: "maximum setpoint is required in the json body" });
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

    const defaultUnit = 'C';                    // Default to Celsius
    const unit = req.query.unit || defaultUnit; // Get unit from query parameter or use default

    try {
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/setpoint/max`, {
            data: {
                max_setpoint: newMaxSetpoint
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

export const readMaxSetpoint = async(req, res) => {
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

    const defaultUnit = 'C';                    // Default to Celsius
    const unit = req.query.unit || defaultUnit; // Get unit from query parameter or use default

    try {
        const response = await axios.get(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/setpoint/max`, {
            params: {
                unit: unit, // include the unit in the query params
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}