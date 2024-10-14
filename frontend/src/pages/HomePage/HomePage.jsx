import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css'; 

const HomePage = () => {
  // const [temperature1, setTemperature1] = useState(0);
  // const [probe1, setProbe1] = useState("");
  // const [probe1Unit, setProbe1Unit] = useState('C');

  // const [temperature2, setTemperature2] = useState(0);
  // const [probe2, setProbe2] = useState("");
  // const [probe2Unit, setProbe2Unit] = useState('C');

  // const [unit, setUnit] = useState('C'); // Default unit is Celsius

  // useEffect(() => {
  //   const fetchTemperature = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/v1/probes/rp1/device01/temperature/t1'); 
  //       const data1 = await response.json();
  //       setTemperature1(data1.temperature);
  //       setProbe1(data1.probe)
  //       setProbe1Unit(data1.unit);

  //       const response2 = await fetch('http://localhost:3000/api/v1/probes/rp1/device01/temperature/t2'); 
  //       const data2 = await response2.json();
  //       setTemperature2(data2.temperature);
  //       setProbe2(data2.probe)
  //       setProbe2Unit(data2.unit);

  //     } catch (error) {
  //       console.error('Error fetching from Probe:', error);
  //     }
  //   };

  //   fetchTemperature();
  //   const intervalId = setInterval(fetchTemperature, 60000); // Fetch every minute

  //   return () => clearInterval(intervalId); // Cleanup on unmount
  // }, []);

  // const convertTemperature = (unitToSet) => {
  //   if (unitToSet === 'C') {

  //   }
  // };

  return (
    <div>
      <h1 className={styles.centered_title}>TEMPERATURE CONTROLLER</h1>

      {/* Top Row for displaying status, and turning system on/off, setting unit (F/C) */}
      <div className={styles.top_grid}>
        <div className={styles.top_grid_side_container}>
          <div className={styles.top_grid_label_button_row}>
            <label className={styles.top_grid_label}>SYSTEM:</label>
            <button className={styles.top_grid_btn}>ON</button>
          </div>
          <div className={styles.top_grid_label_row}>
            <div>
              <label className={styles.top_grid_medium_label}>T1</label>
              <label className={styles.top_grid_small_label}>88</label>
            </div>
            <div>
              <label className={styles.top_grid_medium_label}>T2</label>
              <label className={styles.top_grid_small_label}>-5</label>
            </div>
          </div>
        </div>

        <div className={styles.top_grid_middle_container}>
          <div className={styles.top_grid_label_row}>
            <div className={styles.top_grid_label_button_row}>
              <label className={styles.top_grid_label}>DOOR HEATER:</label>
              <label className={styles.top_grid_label_2}>ON</label>
            </div>
            <div className={ `${styles.top_grid_label_button_row} ${styles.customMarginLeft}`}>
              <label className={styles.top_grid_label}>DEFROST:</label>
              <button className={styles.top_grid_btn}>ON</button>
            </div>
          </div>
          <div className={styles.top_grid_label_row}>
              <div className={styles.top_grid_label_button_row}>
                <label className={styles.top_grid_label}>EVAP FAN:</label>
                <label className={styles.top_grid_label_2}>ON</label>
              </div>
              <div className={ `${styles.top_grid_label_button_row} ${styles.customMarginLeft}`}>
                <label className={styles.top_grid_label}>COMPRESSOR:</label>
                <label className={styles.top_grid_label_2}>ON</label>
              </div>
          </div>
        </div>

        <div className={styles.top_grid_side_container}>
          <div className={styles.top_grid_label_button_row}>
            <label className={styles.top_grid_label}>LIGHTS:</label>
            <button className={styles.top_grid_btn}>ON</button>
          </div>
          <div className={styles.top_grid_label_button_row}>
            <label className={styles.top_grid_label}>UNITS:</label>
            <button className={styles.top_grid_btn}>F/C</button>
          </div>
        </div>
      </div>

      {/* Middle Row for Configurable parameters */}
      <div className={styles.changeable_settings_grid}>
        <div className={styles.changeable_settings_container}>
          <div className={styles.changeable_label_container}>
            <label>SET POINT LOW</label>
          </div>
          <h1 className={styles.changeable_settings_h1}>20ºC</h1>
          <div className={styles.input_button_row}>
            <input
              className={styles.changeable_settings_input}
              type='number'
              placeholder='Set new SPL'
            />
            <button className={styles.changeable_settings_btn}>Set</button>
          </div>
        </div>
        <div className={styles.changeable_settings_container}>
          <div className={styles.changeable_label_container}>
            <label>SET POINT</label>
          </div>
          <h1 className={styles.changeable_settings_h1}>20ºC</h1>
          <div className={styles.input_button_row}>
            <input
              className={styles.changeable_settings_input}
              type='number'
              placeholder='Set new SP'
            />
            <button className={styles.changeable_settings_btn}>Set</button>
          </div>
        </div>
        <div className={styles.changeable_settings_container}>
          <div className={styles.changeable_label_container}>
            <label>SET POINT HIGH</label>
          </div>
          <h1 className={styles.changeable_settings_h1}>20ºC</h1>
          <div className={styles.input_button_row}>
            <input
              className={styles.changeable_settings_input}
              type='number'
              placeholder='Set new SPH'
            />
            <button className={styles.changeable_settings_btn}>Set</button>
          </div>
        </div>
        <div className={styles.changeable_settings_container}>
          <div className={styles.changeable_label_container}>
            <label>HY0</label>
          </div>
          <h1 className={styles.changeable_settings_h1}>20ºC</h1>
          <div className={styles.input_button_row}>
            <input
              className={styles.changeable_settings_input}
              type='number'
              placeholder='Set new HY0'
            />
            <button className={styles.changeable_settings_btn}>Set</button>
          </div>
        </div>
        <div className={styles.changeable_settings_container}>
          <div className={styles.changeable_label_container}>
            <label>HY1</label>
          </div>
          <h1 className={styles.changeable_settings_h1}>20ºC</h1>
          <div className={styles.input_button_row}>
            <input
              className={styles.changeable_settings_input}
              type='number'
              placeholder='Set new HY1'
            />
            <button className={styles.changeable_settings_btn}>Set</button>
          </div>
        </div>
      </div>

      <div className={styles.changeable_settings_grid}>
        <div className={styles.changeable_settings_container}>
          <div className={styles.changeable_label_container}>
            <label>T1</label>
          </div>
          <h1 className={styles.changeable_settings_h1}>20ºC</h1>
        </div>
        <div className={styles.changeable_settings_container}>
          <div className={styles.changeable_label_container}>
            <label>T2</label>
          </div>
          <h1 className={styles.changeable_settings_h1}>20ºC</h1>
        </div>
      </div>
      {/* <div className={styles.display}>
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
      </div> */}
    </div>
  );
};

export default HomePage;
