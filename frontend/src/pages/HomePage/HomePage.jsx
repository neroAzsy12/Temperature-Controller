import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css'; 

const HomePage = () => {
  const [temperature1, setTemperature1] = useState(0);
  const [probe1, setProbe1] = useState("");
  const [probe1Unit, setProbe1Unit] = useState('C');

  const [temperature2, setTemperature2] = useState(0);
  const [probe2, setProbe2] = useState("");
  const [probe2Unit, setProbe2Unit] = useState('C');

  const [unit, setUnit] = useState('C'); // Default unit is Celsius

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/probes/rp1/device01/temperature/t1'); 
        const data1 = await response.json();
        setTemperature1(data1.temperature);
        setProbe1(data1.probe)
        setProbe1Unit(data1.unit);

        const response2 = await fetch('http://localhost:3000/api/v1/probes/rp1/device01/temperature/t2'); 
        const data2 = await response2.json();
        setTemperature2(data2.temperature);
        setProbe2(data2.probe)
        setProbe2Unit(data2.unit);

      } catch (error) {
        console.error('Error fetching from Probe:', error);
      }
    };

    fetchTemperature();
    const intervalId = setInterval(fetchTemperature, 60000); // Fetch every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const convertTemperature = (unitToSet) => {
    if (unitToSet === 'C') {

    }
  };

  return (
    <body>
      <div className={styles.display}>
        <h1>Probe: {probe1}</h1>
        <h2>{temperature1?.toFixed(2)}°{probe1Unit}</h2>
        <div className={styles.toggle}>
        </div>
      </div>
      <div className={styles.display}>
        <h1>Probe: {probe2}</h1>
        <h2>{temperature2?.toFixed(2)}°{probe2Unit}</h2>
        <div className={styles.toggle}>
        </div>
      </div>
    </body>
  );
};

export default HomePage;
