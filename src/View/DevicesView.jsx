/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Form, Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Devices from '../functions/Devices';
import MyPagination from '../components/MyPagination';

const DevicesView = ({ headers }) => {
  const [devices, setDevices] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState('10');
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const pageSizeOptions = [
    { value: '10', label: '10' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
    { value: '500', label: '500' },
    { value: '4000', label: 'ALL' },
  ];

  const getDevices = async () => {
    const startIndex = (page * parseInt(pageSize, 10) - parseInt(pageSize, 10) + 1);
    try {
      setLoading(true);
      setDevices([]);
      await Devices({
        headers, setDevices, searchText, pageSize, setTotalPages, startIndex,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    let isSubscribe = true;
    if (isSubscribe) getDevices();
    return () => { isSubscribe = false; };
  }, [searchText, pageSize, page]);

  return (
    <div className="mainContainer mainContainer-devices">
      <div style={{
        display: 'flex', justifyContent: 'space-between', width: '500px', height: '50px',
      }}
      >
        <InputGroup className="mb-3" style={{ width: '400px' }}>
          <InputGroup.Text id="searchText" />
          <FormControl
            placeholder="Search text"
            aria-label="searchText"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </InputGroup>
        <Form.Select className="mb-3" style={{ marginLeft: '10px', width: '100px' }} onChange={(e) => { setPageSize(e.target.value); setPage(1); }} options={pageSizeOptions} aria-label="Floating label select example">
          {pageSizeOptions.map((el) => <option value={el.value}>{el.label}</option>)}
        </Form.Select>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Shop</th>
            <th>Device Name</th>
            <th>Device ID</th>
            <th>Model</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
          <tr key="unikalny" style={{ textAlign: 'center' }}>
            <td colSpan="5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </td>
          </tr>
          )}
          {devices.map((row, i) => (
            <tr key={i}>
              <td>{parseInt(row.deviceName, 10).toString(10)}</td>
              <td>{row.deviceName}</td>
              <td>{row.deviceId}</td>
              <td>{row.deviceModelName}</td>
              <td>
                {(row.mediaTagValueList) && row.mediaTagValueList.map((el) => el.tagName)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <section className="pagination">
        <MyPagination setPage={setPage} page={page} totalPages={totalPages} />
      </section>
    </div>
  );
};

export default DevicesView;
