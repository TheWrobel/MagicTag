import axios from 'axios';

const DeleteTag = async ({ headers }, tagId) => {
  let data;
  try {
    const body = [tagId.toString()];
    const res = await axios.post('http://192.168.42.21:7001/MagicInfo/restapi/v2.0/ems/settings/tags/deleted-tags', body, { headers });
    data = res;
  } catch (error) {
    console.log(error);
  }
  return data;
};

export default DeleteTag;
