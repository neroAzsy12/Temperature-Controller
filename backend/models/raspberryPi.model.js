import mongoose from "mongoose";

const raspberryPiSchema = new mongoose.Schema({
    rpi_id: {
        type: String,
        required: true,
    },
    kiosk_id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    devices: [String]
});

const RaspberryPi = mongoose.model('raspberry_pis', raspberryPiSchema);
export default RaspberryPi;