/* eslint-disable max-len */
import React, { useState } from 'react';
import DeviceTextArea from '../components/DeviceTextArea';
import DeviceList from '../components/DeviceList';
import TagDevices from '../components/TagDevices';

function TagDevicesView({ headers, setLoading }) {
  const [deviceList, setDeviceList] = useState([[]]);
  const [deviceListMode, setDeviceListMode] = useState('byDeviceID');

  return (
    <div>
      <div className="mainContainer">
        <DeviceTextArea setDeviceList={setDeviceList} setDeviceListMode={setDeviceListMode} deviceListMode={deviceListMode} deviceList={deviceList} />
        <DeviceList setDeviceList={setDeviceList} deviceList={deviceList} />
      </div>
      <div className="tagDevices">
        <TagDevices headers={headers} deviceList={deviceList} setLoading={setLoading} />
      </div>
    </div>
  );
}

export default TagDevicesView;
