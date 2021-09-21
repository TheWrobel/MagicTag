import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

const DeviceList = ({
  setDeviceList, deviceList, setTagable, devices, deviceListMode,
}) => {
  const [text, setText] = useState('');
  useEffect(() => {
    setText(deviceList.join('\r\n'));
  }, [deviceList]);
  console.log(deviceList);

  function arrayEquals(a, b) {
    return Array.isArray(a)
          && Array.isArray(b)
          && a.length === b.length
          && a.every((val, index) => val === b[index]);
  }
  const mergeList = () => {
    setTagable(true);
    let arr1 = [];
    const arr4 = [];
    const deviceListCopy = deviceList;
    deviceListCopy.forEach((el) => {
      arr1.push(el[0]);
    });
    const set = new Set(arr1);
    arr1 = [...set];
    arr1.forEach((el, i) => {
      arr1[i] = [el, []];
    });

    arr1.forEach((el) => {
      deviceListCopy.forEach((el2) => {
        if (el2[0] === el[0]) {
          el[1].push(el2[1]);
        }
      });
    });
    arr1.forEach((el) => {
      arr4.push(el[1]);
    });
    const set2 = new Set(arr4.map(JSON.stringify));
    const arr5 = Array.from(set2).map(JSON.parse);
    const arr6 = [];
    arr5.forEach((el) => {
      arr6.push([[], el]);
    });
    arr6.forEach((el) => {
      arr1.forEach((el2) => {
        if (arrayEquals(el2[1], el[1])) {
          el[0].push(el2[0]);
        }
      });
    });
    if (deviceListMode === 'byDeviceID') setDeviceList(arr6);
    else {
      const arr7 = arr6;
      arr6.forEach((el, i) => {
        const temp = [];
        el[0].forEach((el2) => {
          devices.forEach((el3) => {
            if (el3[0] === el2) el3[1].map((item) => temp.push(item));
          });
        });
        arr7[i][0] = temp;
      });
      setDeviceList(arr7);
    }
  };
  return (
    <div className="deviceListSection">
      <div className="deviceListContainer">
        <h3 className="deviceListHeader">
          List size:
          {(text === '') ? 0 : deviceList.length}
        </h3>
        <div className="deviceListBody">
          <p className="deviceList">{text}</p>
        </div>
      </div>
      <Button onClick={mergeList} style={{ margin: 'auto', marginTop: '10px' }}> Marge List </Button>
    </div>
  );
};

export default DeviceList;
