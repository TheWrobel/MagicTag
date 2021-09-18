/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import DeviceTextArea from '../components/DeviceTextArea';
import DeviceList from '../components/DeviceList';
import TagDevices from '../components/TagDevices';

function TagDevicesView({ headers, setLoading }) {
  const [deviceList, setDeviceList] = useState([[]]);
  const [deviceListMode, setDeviceListMode] = useState('byDeviceID');
  const [tagable, setTagable] = useState(false);
  const [devices, setDevices] = useState([]);
  const [updateing, setUpdateing] = useState(true);

  useEffect(() => {
    const body = {
      connectionStatus: 'device_status_view_connection',
      groupId: '1',
      page: 0,
      pageSize: '150',
      sortColumn: 'device_name',
      sortOrder: 'asc',
      sorted: [{ id: 'deviceName', desc: false }],
      startIndex: 1,
    };
    const getDevices = async () => {
      try {
        const req = await axios.post('http://192.168.42.21:7001/MagicInfo/restapi/v2.0/rms/devices/filter', body, { headers });
        const deviceArray = req.data.items.map((el) => [parseInt(el.deviceName, 10).toString(10), el.deviceId]);
        const arr1 = [];
        deviceArray.forEach((el) => {
          arr1.push(el[0]);
        });
        const set = new Set(arr1);
        const arr2 = [...set];
        arr2.forEach((el, i) => {
          arr2[i] = [el, []];
        });
        arr2.forEach((el) => {
          deviceArray.forEach((el2) => {
            if (el[0] === el2[0]) el[1].push(el2[1]);
          });
        });
        await setDevices(arr2);
        setUpdateing(false);
      } catch (error) {
        console.log(error);
      }
    };
    getDevices();
  }, []);

  return (
    <div>
      {updateing ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (<p>Up to date :)</p>)}
      <div className="mainContainer">
        <DeviceTextArea setDeviceList={setDeviceList} setDeviceListMode={setDeviceListMode} deviceListMode={deviceListMode} deviceList={deviceList} />
        <DeviceList setDeviceList={setDeviceList} deviceList={deviceList} setTagable={setTagable} devices={devices} deviceListMode={deviceListMode} />
      </div>
      <div className="tagDevices">
        <TagDevices headers={headers} deviceList={deviceList} setLoading={setLoading} tagable={tagable} />
      </div>
    </div>
  );
}

export default TagDevicesView;
