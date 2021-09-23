import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Spinner } from 'react-bootstrap';
import loadTags from '../functions/loadTags';

const DeviceTextArea = ({ headers, ...props }) => {
  const [tagList, setTagList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState('');

  useEffect(() => {
    let isSubscribe = true;
    console.log(props);
    if (isSubscribe) loadTags({ headers }, setTagList, setLoading);
    return () => { isSubscribe = false; };
  }, []);

  const handleChange = (e) => {
    props.setDeviceListMode(e.target.id);
    console.log(e.target.id);
  };

  const setNewList = () => {
    const newArr = [];
    const textAreaArray = document.querySelector('.area').value.split('\n');
    const tagArray = tag;
    textAreaArray.forEach((el) => {
      newArr.push([el, tagArray]);
    });
    props.setDeviceList(newArr);
    console.log(props.deviceList.length);
    props.setTagable(false);
  };

  const addToExistingList = () => {
    const addList = [];
    const textAreaArray = document.querySelector('.area').value.split('\n');
    const tagArray = tag;
    textAreaArray.forEach((el) => {
      addList.push([el, tagArray]);
    });
    const currentList = props.deviceList;
    console.log(currentList);
    props.setDeviceList(currentList.concat(addList));
  };

  return (
    <div>
      <Container className="createListContain">
        <Form style={{ postion: 'relative' }}>
          <h3>{props.deviceListMode}</h3>
          <Form.Control
            as="textarea"
            placeholder="Enter list of devices"
            style={{
              height: '100px', maxWidth: '500px', resize: 'none', postition: 'relative',
            }}
            className="area mb-3"
          />
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <Form.Select className="mb-3" onChange={(e) => setTag(e.target.value)} aria-label="Floating label select example">
              <option key="clearer" value="">Clear Tags</option>
              {tagList.map((el) => <option key={el.tagId} value={el.tagId}>{el.tagName}</option>)}
            </Form.Select>
          )}

          <div key="TextAreaRadio">
            <Form.Check
              inline
              defaultChecked
              label="ShopNumber"
              name="TextAreaRadio"
              type="radio"
              id="byShopNumber"
              onClick={handleChange}
              className="mb-3"
            />
            <Form.Check
              inline
              label="DeviceId"
              name="TextAreaRadio"
              type="radio"
              id="byDeviceID"
              onClick={handleChange}
              className="mb-3"
            />
          </div>
          <Button onClick={setNewList} className="m-3">New List</Button>
          <Button onClick={addToExistingList} disabled={props.tagable}>Add to existing</Button>
        </Form>
      </Container>
    </div>
  );
};

export default DeviceTextArea;
