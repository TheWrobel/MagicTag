import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const AddNewTagView = ({ headers }) => {
  const [tagName, setTagName] = useState('');
  const [tagDesc, setTagDesc] = useState('');
  const [newTagId, setNewTagId] = useState('');

  const newTag = async () => {
    const body = {
      tagDesc,
      tagName,
      tagOrgan: 1,
      tagType: 0,
    };
    try {
      const res = await axios.post('http://192.168.42.21:7001/MagicInfo/restapi/v2.0/ems/settings/tags', body, { headers });
      setNewTagId(res.data.items.tagId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleButtonClick = (e) => {
    e.preventDefault();
    newTag();
  };
  return (
    <div
      className="mainContainer"
      style={{
        display: 'flex', flexDirection: 'column', alignContent: 'center',
      }}
    >
      <Form
        autoComplete="OFF"
        style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '400px',
        }}
      >
        <FloatingLabel
          controlId="floatingInput"
          label="New Tag Name"
          className="mb-3"
        >
          <Form.Control type="Input" placeholder="New Tag Name" onChange={(e) => setTagName(e.target.value)} required />
        </FloatingLabel>
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{
            height: '100px', maxWidth: '500px', resize: 'none', postition: 'relative',
          }}
          className="area mb-3"
          onChange={(e) => setTagDesc(e.target.value)}
        />
        <Button variant="primary" type="submit" onClick={handleButtonClick} style={{ minWidth: '150px', alignSelf: 'center' }}>
          Add Tag
        </Button>
      </Form>
      <div>
        {newTagId !== '' ? (
          <h3 style={{ textAlign: 'center' }}>
            New Tag ID:
            {newTagId}
          </h3>
        ) : null}
      </div>
    </div>
  );
};

export default AddNewTagView;
