import axios from 'axios';

const loadTags = async ({ headers }, setTagList, setLoading) => {
  const config = {
    deviceId: 'string',
    organId: 'all',
    pageSize: 100,
    sortColumn: 'tag_id',
    sortOrder: 'asc',
    startIndex: 0,
  };
  setLoading(true);
  try {
    const dataReq = await axios.post('http://192.168.42.21:7001/MagicInfo/restapi/v2.0/ems/settings/tags/filter', config, { headers });
    setLoading(false);
    setTagList(dataReq.data.items);
  } catch (error) {
    setLoading(false);
    console.log(error);
    alert(`Błąd${error}`);
  }
};

export default loadTags;
