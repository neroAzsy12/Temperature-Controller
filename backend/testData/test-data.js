export const RASPBERRY_PI_IDs = {
    'rp1': {
        "url": 'http://raspberrypi-temp-controller-01.local:5001',    // Replace with actual ID
        "devices": [
            "device01"
        ]
    }
}

export const RS485_DEVICE_IDs = {
    'device01': {
        "raspberryPi": "rp1",
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