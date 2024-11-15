import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css'; 
import axios from 'axios';

const HomePage = () => {
  const [data, setData] = useState(null);
  const [unit, setUnit] = useState('F');
  const [loading, setLoading] = useState(true);

  const convertTemperature = async (e) => {
    try {
      const unit = e.target.value;
      const response = await axios.get('http://localhost:3000/api/v1/K175/device_01/cabinet/temperatures', {
        params: {
          unit: unit
        }
      });

      setData((prevData) => ({
        ...prevData,
        temperatures: {
          T1: response.data["probes"]["T1"],
          T2: response.data["probes"]["T2"]
        },
        setpoints: {
          SPL: response.data["setpoints"]["SPL"],
          SP: response.data["setpoints"]["SP"],
          SPH: response.data["setpoints"]["SPH"]
        },
        unit: response.data["unit"]
      }));

      setUnit(unit);
    } catch (err) {
      console.error("Failed to update temperatures", err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/K175/device_01/cabinet/status', {
        params: {
          unit: unit
        }
      });
      setData(response.data);
      setUnit(response.data["unit"]);
    } catch (err) {
      console.error("Failed to get temperatures and status", err);
    }
  }

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data !== null) {
      setLoading(false);
    }
  }, [data]);
 
  // Keep of values that can be changed
  const [newSPL, setSPLNew] = useState(0);
  const [newSPH, setSPHNew] = useState(0);
  const [newSP, setSPNew] = useState(0);
  const [newHY0, setHY0] = useState(0);
  const [newHY1, setHY1] = useState(0);

  const activateStandby = async(e) => {
    try {
      const mode = e.target.value;
      let response;
      if (mode === "ON") {
        response = await axios.post('http://localhost:3000/api/v1/K175/device_01/cabinet/standby/on')
      } else {
        response = await axios.post('http://localhost:3000/api/v1/K175/device_01/cabinet/standby/off')
      }
      setData((prevData) => ({
        ...prevData,
        standby_mode: response.data["standby_mode"],
        status: {
          ...prevData.status,
          evap_fan_status: response.data["status"]["evap_fan_status"],
          compressor_status: response.data["status"]["compressor_status"],
          door_heater_status: response.data["status"]["door_heater_status"],
          defrost_status: response.data["status"]["defrost_status"]
        }
      }));

    } catch (error) {
      console.error(`Error in standby mode:`, error)
    } 
  };

  const activateCabinetLights = async(e) => {
    try {
      const lights_enabled = e.target.value;
      let response;
      if (lights_enabled === "ON") {
        response = await axios.post('http://localhost:3000/api/v1/K175/device_01/cabinet/lights/on')
      } else {
        response = await axios.post('http://localhost:3000/api/v1/K175/device_01/cabinet/lights/off')
      }
      setData((prevData) => ({
        ...prevData,
        status: {
          ...prevData.status,
          cabinet_lights_status: response.data["cabinet_lights_status"]
        }
      }));

    } catch (error) {
      console.error(`Error in lights:`, error)
    }
  };

  const activateDefrostCycle = async(e) => {
    try {
      const defrost_enabled = e.target.value;
      let response;
      if (defrost_enabled === "ON") {
        response = await axios.post('http://localhost:3000/api/v1/K175/device_01/cabinet/defrost/on')
      } else {
        response = await axios.post('http://localhost:3000/api/v1/K175/device_01/cabinet/defrost/off')
      }
      setData((prevData) => ({
        ...prevData,
        status: {
          ...prevData.status,
          defrost_status: response.data["status"]
        }
      }));
    } catch (error) {
      console.error(`Error in defrost:`, error);
    }
  }

  // SPL, SP, SPH logic
  const handleNewSPLChange = (e) => {
    setSPLNew(e.target.value);
  };

  const updateSPL = async() => {
    try {
      const bodyData = { min_setpoint: newSPL };
      const params = { unit: unit};

      const response = await axios.post('http://localhost:3000/api/v1/K175/device_01/cabinet/setpoint/min', bodyData, {
        params: params
      });
      setData((prevData) => ({
        ...prevData,
        setpoints: {
          ...prevData.setpoints,
          SPL: response.data["min_setpoint"],
        },
        unit: response.data["unit"]
      }));

      setUnit(unit);
    } catch (err) {
      console.error("Failed to update SPL", err);
    }
  };

  const handleNewSPChange = (e) => {
    setSPNew(e.target.value);
  };
  const updateSP = async() => {
    try {
      const bodyData = { setpoint: newSP };
      const params = { unit: unit};

      const response = await axios.post('http://localhost:3000/api/v1/K175/device_01/cabinet/setpoint', bodyData, {
        params: params
      });
      setData((prevData) => ({
        ...prevData,
        setpoints: {
          ...prevData.setpoints,
          SP: response.data["setpoint"],
        },
        unit: response.data["unit"]
      }));

      setUnit(unit);
    } catch (err) {
      console.error("Failed to update SP", err);
    }
  };

  const handleNewSPHChange = (e) => {
    setSPHNew(e.target.value);
  };
  const updateSPH = async() => {
    try {
      const bodyData = { max_setpoint: newSPH };
      const params = { unit: unit};

      const response = await axios.post('http://localhost:3000/api/v1/K175/device_01/cabinet/setpoint/max', bodyData, {
        params: params
      });
      setData((prevData) => ({
        ...prevData,
        setpoints: {
          ...prevData.setpoints,
          SPH: response.data["max_setpoint"],
        },
        unit: response.data["unit"]
      }));

      setUnit(unit);
    } catch (err) {
      console.error("Failed to update SPH", err);
    }
  };

  // HY0 Logic
  const handleNewHY0Change = (e) => {
    setHY0(e.target.value);
  };

  const updateHY0 = async() => {
    try {
      const bodyData = { differential: newHY0 };

      const response = await axios.post('http://localhost:3000/api/v1/K175/device_01/cabinet/differential/hy0', bodyData);
      setData((prevData) => ({
        ...prevData,
        differentials: {
          ...prevData.differentials,
          HY0: response.data["HY0"],
        }
      }));
    } catch (err) {
      console.error("Failed to update HY0", err);
    }
  };
  
  // HY1 Logic
  const handleNewHY1Change = (e) => {
    setHY1(e.target.value);
  };

  const updateHY1 = async() => {
    try {
      const bodyData = { differential: newHY1 };

      const response = await axios.post('http://localhost:3000/api/v1/K175/device_01/cabinet/differential/hy1', bodyData);
      setData((prevData) => ({
        ...prevData,
        differentials: {
          ...prevData.differentials,
          HY1: response.data["HY1"],
        }
      }));
    } catch (err) {
      console.error("Failed to update HY1", err);
    }
  };

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
              <label className={styles.top_grid_small_label}>{data["probes"]["T1"]}</label>
            </div>
            <div>
              <label className={styles.top_grid_medium_label}>T2</label>
              <label className={styles.top_grid_small_label}>{data["probes"]["T2"]}</label>
            </div>
          </div>
        </div>

        <div className={styles.top_grid_middle_container}>
          <div className={styles.top_grid_label_row}>
            <div className={styles.top_grid_label_button_row}>
              <label className={styles.top_grid_label}>DOOR HEATER:</label>
              <label className={ data["status"]["door_heater_status"] === "ON" ? `${styles.top_grid_label_2} ${styles.active_btn_color}` : `${styles.top_grid_label_2} ${styles.inactive_btn_color}` } >{data["status"]["door_heater_status"]}</label>
            </div>
            <div className={ `${styles.top_grid_label_button_row} ${styles.customMarginLeft}`}>
              <label className={styles.top_grid_label}>DEFROST:</label>
              <button 
                className={data["status"]["defrost_status"] === "ON" ? `${styles.top_grid_btn} ${styles.active_btn_color}` : `${styles.top_grid_btn} ${styles.inactive_btn_color}` }
                value={data["status"]["defrost_status"] === "ON" ? "OFF" : "ON"}
                onClick={activateDefrostCycle}
            >{data["status"]["defrost_status"]}</button>
            </div>
          </div>
          <div className={styles.top_grid_label_row}>
              <div className={styles.top_grid_label_button_row}>
                <label className={styles.top_grid_label}>EVAP FAN:</label>
                <label className={ data["status"]["evap_fan_status"] === "ON" ? `${styles.top_grid_label_2} ${styles.active_btn_color}` : `${styles.top_grid_label_2} ${styles.inactive_btn_color}` } >{data["status"]["evap_fan_status"]}</label>
                </div>
              <div className={ `${styles.top_grid_label_button_row} ${styles.customMarginLeft}`}>
                <label className={styles.top_grid_label}>COMPRESSOR:</label>
                <label className={ data["status"]["compressor_status"] === "ON" ? `${styles.top_grid_label_2} ${styles.active_btn_color}` : `${styles.top_grid_label_2} ${styles.inactive_btn_color}` } >{data["status"]["compressor_status"]}</label>
              </div>
          </div>
        </div>

        <div className={styles.top_grid_side_container}>
          <div className={styles.top_grid_label_button_row}>
            <label className={styles.top_grid_label}>LIGHTS:</label>
            <button 
              className={data["status"]["cabinet_lights_status"] === "ON" ? `${styles.top_grid_btn} ${styles.active_btn_color}` : `${styles.top_grid_btn} ${styles.inactive_btn_color}` }
              value={data["status"]["cabinet_lights_status"] === "ON" ? "OFF" : "ON"}
              onClick={activateCabinetLights}
            >{data["status"]["cabinet_lights_status"]}</button>
          </div>
          <div className={styles.top_grid_label_button_row}>
            <label className={styles.top_grid_label}>UNITS:</label>
            <button 
              className={`${styles.top_grid_btn} ${styles.active_btn_color}`}
              value={unit === 'C' ? 'F' : 'C'}
              onClick={convertTemperature}  
            >º{unit}</button>
          </div>
        </div>
      </div>

      {/* Middle Row for Configurable parameters */}
      <div className={styles.changeable_settings_grid}>
        <div className={styles.changeable_settings_container}>
          <div className={styles.changeable_label_container}>
            <label>SET POINT LOW</label>
          </div>
          <h1 className={styles.changeable_settings_h1}>{data["setpoints"]["SPL"]}º{unit}</h1>
          <div className={styles.input_button_row}>
            <input
              className={styles.changeable_settings_input}
              type='number' 
              onChange={handleNewSPLChange}
              placeholder='Set new SPL'
              min={unit === 'C' ? '-50' : '-58'}
              max={data["setpoints"]['SPH']}
              step={unit === 'C' ? '0.1' : '1'}
            />
            <button className={styles.changeable_settings_btn}
              onClick={updateSPL}
            >Set</button>
          </div>
        </div>
        <div className={styles.changeable_settings_container}>
          <div className={styles.changeable_label_container}>
            <label>SET POINT</label>
          </div>
          <h1 className={styles.changeable_settings_h1}>{data["setpoints"]["SP"]}º{unit}</h1>
          <div className={styles.input_button_row}>
            <input
              className={styles.changeable_settings_input}
              type='number'
              onChange={handleNewSPChange}
              placeholder='Set new SP'
              min={data["setpoints"]["SPL"]}
              max={data["setpoints"]["SPH"]}
              step={unit === 'C' ? '0.1' : '1'}
            />
            <button className={styles.changeable_settings_btn}
              onClick={updateSP}
            >Set</button>
          </div>
        </div>
        <div className={styles.changeable_settings_container}>
          <div className={styles.changeable_label_container}>
            <label>SET POINT HIGH</label>
          </div>
          <h1 className={styles.changeable_settings_h1}>{data["setpoints"]["SPH"]}º{unit}</h1>
          <div className={styles.input_button_row}>
            <input
              className={styles.changeable_settings_input}
              type='number'
              onChange={handleNewSPHChange}
              placeholder='Set new SPH'
              min={data["setpoints"]["SPL"]}
              max={unit === 'C' ? '110' : '180'}
              step={unit === 'C' ? '0.1' : '1'}
            />
            <button className={styles.changeable_settings_btn}
              onClick={updateSPH}
            >Set</button>
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
              onChange={handleNewHY0Change}
              placeholder='Set new HY0'
              min='1'
              max='10'
            />
            <button className={styles.changeable_settings_btn}
              onClick={updateHY0}
            >Set</button>
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
              onChange={handleNewHY1Change}
              placeholder='Set new HY1'
              min='0'
              max='10'
            />
            <button className={styles.changeable_settings_btn}
              onClick={updateHY1}
            >Set</button>
          </div>
        </div>
      </div>

      <div className={styles.changeable_settings_grid}>
        <div className={styles.changeable_settings_container}>
          <div className={styles.changeable_label_container}>
            <label>T1</label>
          </div>
          <h1 className={styles.changeable_settings_h1}>{data["probes"]["T1"]}º{unit}</h1>
        </div>
        <div className={styles.changeable_settings_container}>
          <div className={styles.changeable_label_container}>
            <label>T2</label>
          </div>
          <h1 className={styles.changeable_settings_h1}>{data["probes"]["T2"]}º{unit}</h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
