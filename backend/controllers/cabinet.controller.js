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

export const turnStandbyOn = async(req, res) => {
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

export const turnStandbyOff = async(req, res) => {
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