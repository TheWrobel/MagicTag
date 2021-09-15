import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { BsXCircle } from 'react-icons/bs';

const DeviceTextArea = (...props) => {
  const handleChange = (e) => {
    props[0].setDeviceListMode(e.target.id);
    console.log(e.target.id);
  };

  const setNewList = () => {
    const newArr = [];
    const textAreaArray = document.querySelector('.area').value.split('\n');
    const tagArray = document.querySelector('.tag').value;
    textAreaArray.forEach((el) => {
      newArr.push([el, tagArray]);
    });
    props[0].setDeviceList(newArr);
    console.log(props[0].deviceList.length);
  };
  const addToExistingList = () => {
    const addList = [];
    const textAreaArray = document.querySelector('.area').value.split('\n');
    const tagArray = document.querySelector('.tag').value;
    textAreaArray.forEach((el) => {
      addList.push([el, tagArray]);
    });
    const currentList = props[0].deviceList;
    console.log(currentList);
    props[0].setDeviceList(currentList.concat(addList));
  };
  const clearTextArea = () => {
    document.querySelector('.area').value = '';
    document.querySelector('.tag').value = '';
  };
  return (
    <div>
      <Container className="createListContain">
        <Form style={{ postion: 'relative' }}>
          <h3>{props[0].deviceListMode}</h3>
          <Form.Control
            as="textarea"
            placeholder="Enter list of devices"
            style={{
              height: '100px', maxWidth: '500px', resize: 'none', postition: 'relative',
            }}
            className="area mb-3"
          />
          <Form.Control
            placeholder="Tag ID"
            className="tag"
          />
          <BsXCircle onClick={clearTextArea} style={{ cursor: 'pointer' }} />
          {' '}
          Clear

          <div key="TextAreaRadio">
            <Form.Check
              inline
              defaultChecked
              label="DeviceId"
              name="TextAreaRadio"
              type="radio"
              id="byDeviceID"
              onClick={handleChange}
              className="mb-3"
            />
            <Form.Check
              inline
              label="ShopNumber"
              name="TextAreaRadio"
              type="radio"
              id="byShopNumber"
              onClick={handleChange}
              className="mb-3"
            />
          </div>
          <Button onClick={setNewList} className="m-3">New List</Button>
          <Button onClick={addToExistingList}>Add to existing</Button>
        </Form>
      </Container>
    </div>
  );
};

export default DeviceTextArea;
