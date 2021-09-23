import React, { useState } from 'react';
import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap';

const TagDevices = ({
  headers, deviceList, tagable,
}) => {
  const [taging, setTaging] = useState(false);
  const [status, setStatus] = useState('');
  const tagDevices = () => {
    deviceList.forEach(async (el) => {
      try {
        setTaging(true);
        const taggingBody = {
          deviceIds: el[0],
          tagIds: el[1],
          tagType: 'MEDIA',
        };
        const reqData = await axios.put('http://192.168.42.21:7001/MagicInfo/restapi/v2.0/rms/devices/tags', taggingBody, { headers });
        setTaging(false);
        setStatus(reqData.data.status);
        console.log(reqData);
      } catch (error) {
        setTaging(false);
        console.log(error);
        alert(`Błąd:${error}`);
      }
    });
  };

  const handleTagButton = () => {
    tagDevices();
  };
  return (
    <div className="tagDevices--content">
      <Button onClick={handleTagButton} disabled={!tagable}>{taging ? <Spinner animation="border" role="status" /> : 'Tag Devices'}</Button>
      {status && (<h1>{status}</h1>)}
    </div>
  );
};

export default TagDevices;
