export const RASPBERRY_PI_IDs = {
    'raspberry_pi_1': {
        "rpi_id": "raspberry_pi_1",
        "url": 'http://raspberrypi-temp-controller-01.local:5001',    // Replace with actual ID
        "koisk_id": "K175",
        "devices": [
            "device_01"
        ]
    }
}

export const RS485_DEVICE_IDs = {
    'device_01': {
        "cabinet_id": "cabinet_01",
        "port": "/dev/ttyUSB0",
        "slaveAddress": 1,
        "mode": "ASCII",
        "baudrate": 9600,
        "bytesize": 7,
        "parity": "even",
        "stopbits": 1,
        "timeout": 3
    }
}
