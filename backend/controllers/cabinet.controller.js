import axios from "axios";
import RaspberryPi from "../models/raspberryPi.model.js";

export const getCabinetStatus = async(req, res) => {
    const kioskId = req.params.kioskId;
    const rs485DeviceId = req.params.rs485DeviceId;

    if (!kioskId) {
        return res.status(400).json({ message: "Kiosk Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    console.log(kioskId, rs485DeviceId);
    const kioskExists = await RaspberryPi.findOne({kiosk_id: kioskId});
    if (!kioskExists) {
        return res.status(404).json({ message: "Kiosk not found"});
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = kioskExists.url;
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi URL not found." });
    }

    const isDevicePresent = kioskExists.devices.includes(rs485DeviceId);

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    if (!isDevicePresent) {
        return res.status(404).json({ message: "RS485 Device not found." });
    }

    const defaultUnit = 'C';                    // Default to Celsius
    const unit = req.query.unit || defaultUnit; // Get unit from query parameter or use default

    try {
        console.log('here')
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
    const kioskId = req.params.kioskId;
    const rs485DeviceId = req.params.rs485DeviceId;

    if (!kioskId) {
        return res.status(400).json({ message: "Kiosk Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    const kioskExists = await RaspberryPi.findOne({kiosk_id: kioskId});
    if (!kioskExists) {
        return res.status(404).json({ message: "Kiosk not found"});
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = kioskExists.url;
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi URL not found." });
    }

    const isDevicePresent = kioskExists.devices.includes(rs485DeviceId);

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    if (!isDevicePresent) {
        return res.status(404).json({ message: "RS485 Device not found." });
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

export const turnStandbyModeOn = async(req, res) => {
    const kioskId = req.params.kioskId;
    const rs485DeviceId = req.params.rs485DeviceId;

    if (!kioskId) {
        return res.status(400).json({ message: "Kiosk Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    const kioskExists = await RaspberryPi.findOne({kiosk_id: kioskId});
    if (!kioskExists) {
        return res.status(404).json({ message: "Kiosk not found"});
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = kioskExists.url;
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi URL not found." });
    }

    const isDevicePresent = kioskExists.devices.includes(rs485DeviceId);

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    if (!isDevicePresent) {
        return res.status(404).json({ message: "RS485 Device not found." });
    }

    try {
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/cabinet/standby/on`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const turnStandbyModeOff = async(req, res) => {
    const kioskId = req.params.kioskId;
    const rs485DeviceId = req.params.rs485DeviceId;

    if (!kioskId) {
        return res.status(400).json({ message: "Kiosk Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    const kioskExists = await RaspberryPi.findOne({kiosk_id: kioskId});
    if (!kioskExists) {
        return res.status(404).json({ message: "Kiosk not found"});
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = kioskExists.url;
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi URL not found." });
    }

    const isDevicePresent = kioskExists.devices.includes(rs485DeviceId);

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    if (!isDevicePresent) {
        return res.status(404).json({ message: "RS485 Device not found." });
    }

    try {
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/cabinet/standby/off`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const turnCabinetLightsOn = async(req, res) => {
    const kioskId = req.params.kioskId;
    const rs485DeviceId = req.params.rs485DeviceId;

    if (!kioskId) {
        return res.status(400).json({ message: "Kiosk Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    const kioskExists = await RaspberryPi.findOne({kiosk_id: kioskId});
    if (!kioskExists) {
        return res.status(404).json({ message: "Kiosk not found"});
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = kioskExists.url;
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi URL not found." });
    }

    const isDevicePresent = kioskExists.devices.includes(rs485DeviceId);

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    if (!isDevicePresent) {
        return res.status(404).json({ message: "RS485 Device not found." });
    }

    try {
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/cabinet/light/on`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const turnCabinetLightsOff = async(req, res) => {
    const kioskId = req.params.kioskId;
    const rs485DeviceId = req.params.rs485DeviceId;

    if (!kioskId) {
        return res.status(400).json({ message: "Kiosk Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    const kioskExists = await RaspberryPi.findOne({kiosk_id: kioskId});
    if (!kioskExists) {
        return res.status(404).json({ message: "Kiosk not found"});
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = kioskExists.url;
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi URL not found." });
    }

    const isDevicePresent = kioskExists.devices.includes(rs485DeviceId);

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    if (!isDevicePresent) {
        return res.status(404).json({ message: "RS485 Device not found." });
    }

    try {
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/cabinet/light/off`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const turnDefrostCycleOn = async(req, res) => {
    const kioskId = req.params.kioskId;
    const rs485DeviceId = req.params.rs485DeviceId;

    if (!kioskId) {
        return res.status(400).json({ message: "Kiosk Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    const kioskExists = await RaspberryPi.findOne({kiosk_id: kioskId});
    if (!kioskExists) {
        return res.status(404).json({ message: "Kiosk not found"});
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = kioskExists.url;
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi URL not found." });
    }

    const isDevicePresent = kioskExists.devices.includes(rs485DeviceId);

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    if (!isDevicePresent) {
        return res.status(404).json({ message: "RS485 Device not found." });
    }

    try {
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/defrost/on`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const turnDefrostCycleOff = async(req, res) => {
    const kioskId = req.params.kioskId;
    const rs485DeviceId = req.params.rs485DeviceId;

    if (!kioskId) {
        return res.status(400).json({ message: "Kiosk Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    const kioskExists = await RaspberryPi.findOne({kiosk_id: kioskId});
    if (!kioskExists) {
        return res.status(404).json({ message: "Kiosk not found"});
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = kioskExists.url;
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi URL not found." });
    }

    const isDevicePresent = kioskExists.devices.includes(rs485DeviceId);

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    if (!isDevicePresent) {
        return res.status(404).json({ message: "RS485 Device not found." });
    }

    try {
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/defrost/off`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const setSetpoint = async(req, res) => {
    const kioskId = req.params.kioskId;
    const rs485DeviceId = req.params.rs485DeviceId;
    const newSetpoint = req.body.setpoint;

    if (!kioskId) {
        return res.status(400).json({ message: "Kiosk Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    if (!newSetpoint) {
        return res.status(400).json({ message: "setpoint is required in the json body" });
    }

    const kioskExists = await RaspberryPi.findOne({kiosk_id: kioskId});
    if (!kioskExists) {
        return res.status(404).json({ message: "Kiosk not found"});
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = kioskExists.url;
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi URL not found." });
    }

    const isDevicePresent = kioskExists.devices.includes(rs485DeviceId);

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    if (!isDevicePresent) {
        return res.status(404).json({ message: "RS485 Device not found." });
    }

    const defaultUnit = 'C';                    // Default to Celsius
    const unit = req.query.unit || defaultUnit; // Get unit from query parameter or use default

    try {
        const data = { setpoint: newSetpoint }
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/setpoint`, data, {
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
    const kioskId = req.params.kioskId;
    const rs485DeviceId = req.params.rs485DeviceId;
    const newMinSetpoint = req.body.min_setpoint;

    if (!kioskId) {
        return res.status(400).json({ message: "Kiosk Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    if (!newMinSetpoint) {
        return res.status(400).json({ message: "minimum setpoint is required in the json body" });
    }

    const kioskExists = await RaspberryPi.findOne({kiosk_id: kioskId});
    if (!kioskExists) {
        return res.status(404).json({ message: "Kiosk not found"});
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = kioskExists.url;
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi URL not found." });
    }

    const isDevicePresent = kioskExists.devices.includes(rs485DeviceId);

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    if (!isDevicePresent) {
        return res.status(404).json({ message: "RS485 Device not found." });
    }

    const defaultUnit = 'C';                    // Default to Celsius
    const unit = req.query.unit || defaultUnit; // Get unit from query parameter or use default

    try {
        const data = { min_setpoint: newMinSetpoint };
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/setpoint/min`, data, {
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
    const kioskId = req.params.kioskId;
    const rs485DeviceId = req.params.rs485DeviceId;
    const newMaxSetpoint = req.body.max_setpoint;

    if (!kioskId) {
        return res.status(400).json({ message: "Kiosk Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    if (!newMaxSetpoint) {
        return res.status(400).json({ message: "maximum setpoint is required in the json body" });
    }

    const kioskExists = await RaspberryPi.findOne({kiosk_id: kioskId});
    if (!kioskExists) {
        return res.status(404).json({ message: "Kiosk not found"});
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = kioskExists.url;
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi URL not found." });
    }

    const isDevicePresent = kioskExists.devices.includes(rs485DeviceId);

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    if (!isDevicePresent) {
        return res.status(404).json({ message: "RS485 Device not found." });
    }

    const defaultUnit = 'C';                    // Default to Celsius
    const unit = req.query.unit || defaultUnit; // Get unit from query parameter or use default

    try {
        const data = { max_setpoint: newMaxSetpoint };
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/setpoint/max`, data, {
            params: {
                unit: unit, // include the unit in the query params
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const setHy0Differential = async(req, res) => {
    const kioskId = req.params.kioskId;
    const rs485DeviceId = req.params.rs485DeviceId;
    const newHy0 = req.body.differential;

    if (!kioskId) {
        return res.status(400).json({ message: "Kiosk Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    if (!newHy0) {
        return res.status(400).json({ message: "HY0 Differential is required in the json body" });
    }

    const kioskExists = await RaspberryPi.findOne({kiosk_id: kioskId});
    if (!kioskExists) {
        return res.status(404).json({ message: "Kiosk not found"});
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = kioskExists.url;
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi URL not found." });
    }

    const isDevicePresent = kioskExists.devices.includes(rs485DeviceId);

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    if (!isDevicePresent) {
        return res.status(404).json({ message: "RS485 Device not found." });
    }

    try {
        const data = { differential: newHy0 };
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/compressor/hy0`, data);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const setHy1Differential = async(req, res) => {
    const kioskId = req.params.kioskId;
    const rs485DeviceId = req.params.rs485DeviceId;
    const newHy1  = req.body.differential;

    if (!kioskId) {
        return res.status(400).json({ message: "Kiosk Id required" });
    }

    if (!rs485DeviceId) {
        return res.status(400).json({ message: "RS485 Device Id required" });
    }

    if (!newHy1) {
        return res.status(400).json({ message: "HY1 Differential is required in the json body" });
    }

    const kioskExists = await RaspberryPi.findOne({kiosk_id: kioskId});
    if (!kioskExists) {
        return res.status(404).json({ message: "Kiosk not found"});
    }

    // check if raspberry pi id is valid
    const raspberryPiUrl = kioskExists.url;
    if (!raspberryPiUrl) {
        return res.status(404).json({ message: "Raspberry Pi URL not found." });
    }

    const isDevicePresent = kioskExists.devices.includes(rs485DeviceId);

    // check if rs485 device id is valid, and if connected to the corresponding raspberry pi
    if (!isDevicePresent) {
        return res.status(404).json({ message: "RS485 Device not found." });
    }

    try {
        const data = { differential: newHy1 };
        const response = await axios.post(`${raspberryPiUrl}/temperature-controller/api/v1/${rs485DeviceId}/compressor/hy1`, data);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}