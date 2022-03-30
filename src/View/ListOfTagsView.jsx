import React, { useState, useEffect } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import deleteTag from '../functions/deleteTag';
import loadTags from '../functions/loadTags';

const ListOfTagsView = ({ headers }) => {
  const [tagList, setTagList] = useState([]);
  const [loading, setLoading] = useState(false);

  const deleteTagButton = async (tagIds) => {
    const res = await deleteTag({ headers }, tagIds);
    console.log(res);
    setTimeout(() => {
      loadTags({ headers }, setTagList, setLoading);
    }, 3000);
  };

  useEffect(() => {
    let isSubscribe = true;
    if (isSubscribe) loadTags({ headers }, setTagList, setLoading);
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
            <th>Delete</th>
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
              <td>
                <Button variant="danger" onClick={() => { deleteTagButton(row.tagId); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                  </svg>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={() => loadTags({ headers }, setTagList, setLoading)} style={{ alignSelf: 'right' }}>Reload</Button>
    </div>
  );
};

export default ListOfTagsView;
