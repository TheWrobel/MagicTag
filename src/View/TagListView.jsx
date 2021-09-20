/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

const TagListView = ({ headers }) => {
  const [tagList, setTagList] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTags = async () => {
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

  useEffect(() => {
    let isSubscribe = true;
    if (isSubscribe) loadTags();
    return () => { isSubscribe = false; };
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
          {loading && (
          <tr key="loader" style={{ textAlign: 'center' }}>
            <td colSpan="5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </td>
          </tr>
          )}
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
