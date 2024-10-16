import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css'; 
import axios from 'axios';

const HomePage = () => {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [standbyMode, setStandbyMode] = useState('OFF');

  const [t1, setT1] = useState(0);
  const [t2, setT2] = useState(0);
  
  const [doorHeaterStatus, setDoorHeaterStatus] = useState("OFF")
  const [evaporatorFanStatus, setEvaporatorFanStatus] = useState("OFF")
  const [compressorStatus, setCompressorStatus] = useState("OFF")
  const [defrostStatus, setDefrostStatus] = useState("OFF")

  const [SPL, setSPL] = useState(0);
  const [SP, setSP] = useState(0);
  const [SPH, setSPH] = useState(0);
  const [HY0, setHY0] = useState(0);
  const [HY1, setHY1] = useState(0);

  const [temp_unit, setUnit] = useState('F');

  // const fetchCabinetStatus = async() => {
  //   try {
  //     const baseURL = 'http://localhost:3000/api/v1/cabinet/rp1/device01/cabinet/status'
  //     const params = new URLSearchParams({ unit: temp_unit });
  //     const urlWithParams = `${baseURL}?${params.toString()}`;
      
  //     const response = await fetch(urlWithParams)
  //     const data = await response.json();

  //     setT1(data.temperatures["T1"]);
  //     setT2(data.temperatures["T2"]);
  //     setEvaporatorFanStatus(data.evap_fan_status)
  //     setCompressorStatus(data.compressor_status)
  //     setDefrostStatus(data.defrost_status)
  //   } catch (error) {
  //     console.error(`Error fetching temperatures:`, error);
  //   }
  // };

  const fetchCabinetStatus = async() => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/cabinet/rp1/device01/cabinet/status', {
        params: {
          unit: temp_unit
        }
      });
      setData(response.data);
    } catch (err) {
      console.error("Failed to update temperatures", err);
    }
  };

  // const fetchConfigurableSettings = async() => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/api/v1/cabinet/rp1/device01/cabinet/configurable-settings", {
  //       params: {
  //         unit: temp_unit
  //       }
  //     });
  //     setData1(response.data);
  //   } catch (error) {
  //     console.error("Failed to get settings:", error);
  //   }
  // };

  const convertTemperature = () => {
    const unit = event.target.value;
    setUnit(unit);

    const baseURL = 'http://localhost:3000/api/v1/probes/rp1/device01/temperature/all'
    const params = new URLSearchParams({ unit: temp_unit });
    const urlWithParams = `${baseURL}?${params.toString()}`;
  };

  const activateStandby = () => {
    try {
      const mode = event.target.value;
      let url;
      if (mode === "ON") {
        url = 'http://localhost:3000/api/v1/standby/rp1/device01/standby/on';
      } else {
        url = 'http://localhost:3000/api/v1/standby/rp1/device01/standby/off';
      }
      
      const requestOptions = {
        method: 'post',
        headers: { 
          'Content-Type': 'application/json; charset=UTF-8' 
        }
      };

      fetch(url, requestOptions)
        .then(setStandbyMode(mode))
        .catch(error => console.error(error));
    } catch (error) {
      console.error(`Error in standby mode:`, error)
    } 
  };

  const checkLoading = () => {
    if (data) {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     await Promise.all([fetchCabinetStatus(), fetchConfigurableSettings()]);
  //     checkLoading();
  //   };

  //   fetchData();
  //   const interval = setInterval(() => {
  //     fetchCabinetStatus();
  //   }, 60000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    // set up interval to fetch temperatures every 5 minutes
    fetchCabinetStatus();
    const interval = setInterval(() => {
      fetchCabinetStatus();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   fetchConfigurableSettings();
  // }, []);

  useEffect(() => {
    checkLoading();
  }, [data]);

  if (loading) {
    return (
      <div>
        <h1 className={styles.centered_title}>TEMPERATURE CONTROLLER</h1>
        <span className={styles.loader}></span>
      </div>
    )
  }

  return (
    <div>
      <h1 className={styles.centered_title}>TEMPERATURE CONTROLLER</h1>
      <div className={styles.top_grid}>
        <div className={styles.top_grid_side_container}>
          <div className={styles.top_grid_label_button_row}>
            <label className={styles.top_grid_label}>SYSTEM:</label>
            <button 
              className={ data["standby_mode"] === "ON" ? `${styles.top_grid_btn} ${styles.inactive_btn_color}` : `${styles.top_grid_btn} ${styles.active_btn_color}` } 
              value={data["standby_mode"] === 'ON' ? 'OFF' : 'ON'}
              onClick={activateStandby}
            >{data["standby_mode"] === 'OFF' ? 'ON' : 'OFF'}</button>
          </div>
          <div className={styles.top_grid_label_row}>
            <div>
              <label className={styles.top_grid_medium_label}>T1</label>
              <label className={styles.top_grid_small_label}>{data["temperatures"]["T1"]}</label>
            </div>
            <div>
              <label className={styles.top_grid_medium_label}>T2</label>
              <label className={styles.top_grid_small_label}>{data["temperatures"]["T2"]}</label>
            </div>
          </div>
        </div>

        <div className={styles.top_grid_middle_container}>
          <div className={styles.top_grid_label_row}>
            <div className={styles.top_grid_label_button_row}>
              <label className={styles.top_grid_label}>DOOR HEATER:</label>
              <label className={ doorHeaterStatus === "ON" ? `${styles.top_grid_label_2} ${styles.active_btn_color}` : `${styles.top_grid_label_2} ${styles.inactive_btn_color}` } >{doorHeaterStatus}</label>
            </div>
            <div className={ `${styles.top_grid_label_button_row} ${styles.customMarginLeft}`}>
              <label className={styles.top_grid_label}>DEFROST:</label>
              <label className={ data["defrost_status"] === "ON" ? `${styles.top_grid_label_2} ${styles.active_btn_color}` : `${styles.top_grid_label_2} ${styles.inactive_btn_color}` } >{data["defrost_status"]}</label>
            </div>
          </div>
          <div className={styles.top_grid_label_row}>
              <div className={styles.top_grid_label_button_row}>
                <label className={styles.top_grid_label}>EVAP FAN:</label>
                <label className={ data["evap_fan_status"] === "ON" ? `${styles.top_grid_label_2} ${styles.active_btn_color}` : `${styles.top_grid_label_2} ${styles.inactive_btn_color}` } >{data["evap_fan_status"]}</label>
                </div>
              <div className={ `${styles.top_grid_label_button_row} ${styles.customMarginLeft}`}>
                <label className={styles.top_grid_label}>COMPRESSOR:</label>
                <label className={ data["compressor_status"] === "ON" ? `${styles.top_grid_label_2} ${styles.active_btn_color}` : `${styles.top_grid_label_2} ${styles.inactive_btn_color}` } >{data["compressor_status"]}</label>
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
            <button 
              className={`${styles.top_grid_btn} ${styles.active_btn_color}`}
              value={temp_unit === 'C' ? 'F' : 'C'}
              onClick={convertTemperature}  
            >º{temp_unit}</button>
          </div>
        </div>
      </div>

      {/* Middle Row for Configurable parameters */}
      <div className={styles.changeable_settings_grid}>
        <div className={styles.changeable_settings_container}>
          <div className={styles.changeable_label_container}>
            <label>SET POINT LOW</label>
          </div>
          <h1 className={styles.changeable_settings_h1}>{data["setpoints"]["SPL"]}º{temp_unit}</h1>
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
          <h1 className={styles.changeable_settings_h1}>{data["setpoints"]["SP"]}º{temp_unit}</h1>
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
          <h1 className={styles.changeable_settings_h1}>{data["setpoints"]["SPH"]}º{temp_unit}</h1>
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
          <h1 className={styles.changeable_settings_h1}>{data["differentials"]["HY0"]}</h1>
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
          <h1 className={styles.changeable_settings_h1}>{data["differentials"]["HY1"]}</h1>
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
          <h1 className={styles.changeable_settings_h1}>{data["temperatures"]["T1"]}º{temp_unit}</h1>
        </div>
        <div className={styles.changeable_settings_container}>
          <div className={styles.changeable_label_container}>
            <label>T2</label>
          </div>
          <h1 className={styles.changeable_settings_h1}>{data["temperatures"]["T2"]}º{temp_unit}</h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
