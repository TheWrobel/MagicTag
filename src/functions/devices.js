import axios from 'axios';

const Devices = async ({
  headers, setDevices, searchText, pageSize, setTotalPages, startIndex,
}) => {
  try {
    const body = {
      // connectionStatus: 'device_status_view_connection',
      groupId: '1',
      searchText,
      pageSize,
      connectionStatus: 'device_status_view_all',
      deviceType: ['S4PLAYER', 'S6PLAYER', 'S7PLAYER'],
      sortColumn: 'device_name',
      sortOrder: 'asc',
      sorted: [{ id: 'deviceName', desc: false }],
      startIndex,
    };
    const req = await axios.post('http://192.168.42.21:7001/MagicInfo/restapi/v2.0/rms/devices/filter', body, { headers });
    const devArray = req.data.items;
    console.log(devArray);
    await setDevices(devArray);
    setTotalPages(Math.ceil(req.data.totalCount / pageSize));
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export default Devices;
