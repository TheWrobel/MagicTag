import axios from 'axios';

const Devices = async ({
  headers, setDevices, searchText, pageSize,
}) => {
  try {
    const body = {
      connectionStatus: 'device_status_view_connection',
      groupId: '1',
      page: 0,
      searchText,
      pageSize,
      sortColumn: 'device_name',
      sortOrder: 'asc',
      sorted: [{ id: 'deviceName', desc: false }],
      startIndex: 1,
    };
    const req = await axios.post('http://192.168.42.21:7001/MagicInfo/restapi/v2.0/rms/devices/filter', body, { headers });
    await setDevices(req.data.items);
    console.log(req.data.items);
  } catch (error) {
    console.log(error);
  }
};

export default Devices;
