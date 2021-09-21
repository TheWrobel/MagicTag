import React from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';

const TagDevices = ({
  headers, deviceList, setLoading, tagable,
}) => {
  const tagDevices = () => {
    deviceList.forEach(async (el) => {
      try {
        setLoading(true);
        const taggingBody = {
          deviceIds: el[0],
          tagIds: el[1],
          tagType: 'MEDIA',
        };
        const reqData = await axios.put('http://192.168.42.21:7001/MagicInfo/restapi/v2.0/rms/devices/tags', taggingBody, { headers });
        console.log(reqData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        alert(`Błąd logowania:${error}`);
      }
    });
  };

  const handleTagButton = () => {
    tagDevices();
  };
  return (
    <div className="tagDevices--content">
      <Button onClick={handleTagButton} disabled={!tagable}>Tag Devices</Button>
    </div>
  );
};

export default TagDevices;
