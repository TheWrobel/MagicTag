/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Button, Form, Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Devices from '../functions/devices';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchText(document.querySelector('#searchTextId').value);
    setPage(1);
  };

  return (
    <div className="mainContainer mainContainer-devices">
      <Form
        className="deviceListForm"
        onSubmit={handleSubmit}
      >
        <InputGroup className="mb-3" style={{ width: '400px' }}>
          <InputGroup.Text id="searchText" />
          <FormControl
            id="searchTextId"
            placeholder="Search text"
            aria-label="searchText"
            autoComplete="off"
          />
        </InputGroup>
        <Button variant="light" onClick={handleSubmit} style={{ width: '40px', height: '38px', marginLeft: '10px' }}>
          <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="2 0 30 30" width="24px" height="24px">
            <path d="M22 20L20 22 14 16 14 14 16 14z" />
            <path fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="2" d="M9 3A6 6 0 1 0 9 15A6 6 0 1 0 9 3Z" />
            <path fill="none" stroke="#000000" strokeMiterlimit="10" d="M13 13L15.5 15.5" />
          </svg>
        </Button>
        <Form.Select className="mb-3" style={{ marginLeft: '10px', width: '100px', height: '38px' }} onChange={(e) => { setPageSize(e.target.value); setPage(1); }} options={pageSizeOptions} aria-label="Floating label select example">
          {pageSizeOptions.map((el) => <option key={el.value} value={el.value}>{el.label}</option>)}
        </Form.Select>
      </Form>
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
          {devices.map((row) => (
            <tr key={row.deviceId}>
              <td>{parseInt(row.deviceName, 10).toString(10)}</td>
              <td>{row.deviceName}</td>
              <td>{row.deviceId}</td>
              <td>{row.deviceModelName}</td>
              <td>
                {(row.mediaTagValueList) && row.mediaTagValueList.map((el) => el.tagName).join(', ')}
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
