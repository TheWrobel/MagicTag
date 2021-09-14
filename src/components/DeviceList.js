import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';

const DeviceList = ({setDeviceList, deviceList}) => {
    const [text, setText] = useState("")
    useEffect(() => {
        setText(deviceList.join("\r\n"));
    },[deviceList]);
    console.log(deviceList);

    function arrayEquals(a, b) {
        return Array.isArray(a) &&
          Array.isArray(b) &&
          a.length === b.length &&
          a.every((val, index) => val === b[index]);
      }

    const margeList = () => {
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        let deviceListCopy = deviceList;
        deviceListCopy.forEach(el => {
            arr1.push(el[0]);
        });
        let set = new Set(arr1);
        arr2 = [...set];
        arr2.forEach((el, i) => {
            arr3[i] = [el,[]];
        });

        arr3.forEach(el => {
            deviceListCopy.forEach(el2 => {
                if(el2[0] === el[0]){
                    el[1].push(el2[1]);
                }
            })  
        })
        arr3.forEach(el => {
            arr4.push(el[1]);            
        })
        let set2  = new Set(arr4.map(JSON.stringify));
        let arr5 = Array.from(set2).map(JSON.parse);
        let arr6 = [];
        arr5.forEach(el =>{
            arr6.push([[], el]);
        })
        arr6.forEach(el => {
            arr3.forEach(el2 => {
                if(arrayEquals(el2[1], el[1])){
                    el[0].push(el2[0]);
                }
            })
        })
        setDeviceList(arr6);
    }
    return (
        <div className="deviceListSection">
            <div className="deviceListContainer">
                <h3 className="deviceListHeader">List size:{(text==="")?0:deviceList.length}</h3>
                <div className="deviceListBody">
                    <p className="deviceList">{text}</p>
                </div>
            </div>
            <Button onClick={margeList} style={{margin:"auto", marginTop:"10px"}}> Marge List </Button>
        </div>
    )
}

export default DeviceList
