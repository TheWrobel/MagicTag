import axios from 'axios';

const deleteTag = async ({ headers }, tagId) => {
  let data2;
  let devicesToClear = [];

  const tagger = async (dejta) => {
    try{
      const reqData = axios.put('http://192.168.42.21:7001/MagicInfo/restapi/v2.0/rms/devices/tags', dejta, { headers });
      console.log(reqData.data);
    } catch (e) {
      console.log(e);
    }
  }
  
  try {
    const response = await axios.post('http://192.168.42.21:7001/MagicInfo/restapi/v2.0/rms/devices/filter',
     {  connectionStatus: "device_status_view_all",
        page: 0,
        pageSize: "3000",
        sortColumn: "device_name",
        sortOrder: "asc",
        sorted: [{id: "deviceName", desc: false}],
        startIndex: 1,
        tagIds: [tagId]
      }, 
      { headers }
    );
    data2 = response.data.items;
    data2.forEach(el => {
      devicesToClear.push([el.deviceId, el.mediaTagValueList.map(el => el.tagId)]);
    });
    
    function arrayEquals(a, b) {
      return Array.isArray(a)
            && Array.isArray(b)
            && a.length === b.length
            && a.every((val, index) => val === b[index]);
    }
    let arr1 = [];
    arr1.push(devicesToClear.map(el => el[1]));
    const set1 = new Set(arr1[0].map(JSON.stringify));
    const arr2 = Array.from(set1).map(JSON.parse);
    let arr3 = [];
    arr2.forEach((el, i) => {
      arr3[i] = {deviceIds:[], tagIds:el, tagType: 'MEDIA'};
    });
    devicesToClear.forEach(el => {
      arr2.forEach(el2 => {
        if(arrayEquals(el[1], el2)){
          arr3.forEach(el3 => {
            if(arrayEquals(el3.tagIds, el2)){
              el3.deviceIds.push(el[0]);
            }
          })
        }
      });
    });
    console.log(arr3);
    await arr3.forEach(async el => {
      el.tagIds.splice(el.tagIds.indexOf(tagId), 1);
      if (el.tagIds.length == 0) el.tagIds.push(""); 
      el.tagIds = el.tagIds.map(el => String(el));
      console.log(el);
      await tagger(el)
    })  

    const body = [tagId.toString(10)];
    const res = await axios.post('http://192.168.42.21:7001/MagicInfo/restapi/v2.0/ems/settings/tags/deleted-tags', body, { headers });
    const data = res;
    return data;
  } catch (error) {
    console.log(error);
  }

};

export default deleteTag;
