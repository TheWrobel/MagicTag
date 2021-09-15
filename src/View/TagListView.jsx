/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const TagListView = ({ headers }) => {
  const [tagList, setTagList] = useState([]);
  const config = {
    deviceId: 'string',
    organId: 'all',
    pageSize: 100,
    sortColumn: 'tag_id',
    sortOrder: 'asc',
    startIndex: 0,
  };
  const loadTags = async () => {
    try {
      const dataReq = await axios.post('http://192.168.42.21:7001/MagicInfo/restapi/v2.0/ems/settings/tags/filter', config, { headers });
      setTagList(dataReq.data.items);
    } catch (error) {
      console.log(error);
      alert(`Błąd${error}`);
    }
  };
  useEffect(() => {
    loadTags();
    return () => setTagList([]);
  }, []);

  return (
    <div className="mainContainer">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Tag ID</th>
            <th>Tag Name</th>
            <th>Num of Devices</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tagList.map((row) => (
            <tr key={row.tagId}>
              <td>{row.tagId}</td>
              <td>{row.tagName}</td>
              <td>{row.deviceCount}</td>
              <td>{row.tagDesc}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={loadTags} style={{ alignSelf: 'right' }}>Reload</Button>
    </div>
  );
};

export default TagListView;
