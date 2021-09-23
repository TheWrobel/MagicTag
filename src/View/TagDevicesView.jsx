/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import DeviceTextArea from '../components/DeviceTextArea';
import DeviceList from '../components/DeviceList';
import TagDevices from '../components/TagDevices';
import flatDeviceList from '../functions/flatDev';

function TagDevicesView({ headers }) {
  const [deviceList, setDeviceList] = useState([[]]);
  const [deviceListMode, setDeviceListMode] = useState('byShopNumber');
  const [tagable, setTagable] = useState(false);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    let isSubscribe = true;
    const deviceArray = flatDeviceList.map((el) => [parseInt(el.deviceName, 10).toString(10), el.deviceId]);
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
    if (isSubscribe) setDevices(arr2);
    return () => { isSubscribe = false; };
  }, []);

  return (
    <div>
      <div className="mainContainer">
        <DeviceTextArea setDeviceList={setDeviceList} setDeviceListMode={setDeviceListMode} deviceListMode={deviceListMode} deviceList={deviceList} headers={headers} tagable={tagable} setTagable={setTagable} />
        <DeviceList setDeviceList={setDeviceList} deviceList={deviceList} setTagable={setTagable} devices={devices} deviceListMode={deviceListMode} />
      </div>
      <div className="tagDevices">
        <TagDevices headers={headers} deviceList={deviceList} tagable={tagable} />
      </div>
    </div>
  );
}

export default TagDevicesView;
