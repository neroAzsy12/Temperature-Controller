export const RASPBERRY_PI_IDs = {
    'rp1': {
        "url": 'http://<RPI_I_IP>:5001',    // Replace with actual ID
        "devices": [
            "device01"
        ]
    }
}

export const RS485_DEVICE_IDs = {
    'device01': {
        "raspberryPi": "rp1",
        "port": "COM5",
        "slaveAddress": 1,
        "mode": "ascii",
        "baudrate": 9600,
        "bytesize": 7,
        "parity": "even",
        "stopbits": 1,
        "timeout": 3
    }
}