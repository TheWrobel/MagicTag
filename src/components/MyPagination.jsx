/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

const MyPagination = ({ ...props }) => {
  const [pageArray, setPageArray] = useState([]);

  useEffect(() => {
    const totPages = props.totalPages;
    const currentPage = props.page;
    let pageArr = [];
    if (totPages > 1) {
      if (totPages <= 9) {
        let i = 1;
        while (i <= totPages) {
          pageArr.push(i);
          i += 1;
        }
      } else if (currentPage <= 5) pageArr = [1, 2, 3, 4, 5, 6, 7, 8, '', totPages];
      else if (totPages - currentPage <= 4) {
        pageArr = [
          1,
          '',
          totPages - 7,
          totPages - 6,
          totPages - 5,
          totPages - 4,
          totPages - 3,
          totPages - 2,
          totPages - 1,
          totPages,
        ];
      } else {
        pageArr = [
          1,
          '',
          currentPage - 3,
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          currentPage + 3,
          '',
          totPages,
        ];
      }
    }
    setPageArray(pageArr);
  }, [props.totalPages, props.page]);

  return (
    <>
      <Pagination style={{ justifyContent: 'center', padding: '3px' }}>
        {pageArray.map((ele, ind) => {
          const toReturn = [];

          if (ind === 0) {
            toReturn.push(
              <Pagination.First
                key="firstpage"
                onClick={
                    props.page === 1
                      ? () => {}
                      : () => {
                        props.setPage(1);
                      }
                  }
              />,
            );

            toReturn.push(
              <Pagination.Prev
                key="prevpage"
                onClick={
                    props.page === 1
                      ? () => {}
                      : () => {
                        props.setPage(props.currentPage - 1);
                      }
                  }
              />,
            );
          }

          if (ele === '') toReturn.push(<Pagination.Ellipsis key={ind} />);
          else {
            toReturn.push(
              <Pagination.Item
                key={ind}
                active={props.page === ele}
                onClick={
                    props.page === ele
                      ? () => {}
                      : () => {
                        props.setPage(ele);
                      }
                  }
              >
                {ele}
              </Pagination.Item>,
            );
          }

          if (ind === pageArray.length - 1) {
            toReturn.push(
              <Pagination.Next
                key="nextpage"
                onClick={
                    props.page === ele
                      ? () => {}
                      : () => {
                        props.setPage(props.page + 1);
                      }
                  }
              />,
            );

            toReturn.push(
              <Pagination.Last
                key="lastpage"
                onClick={
                    props.page === ele
                      ? () => {}
                      : () => {
                        props.setPage(ele);
                      }
                  }
              />,
            );
          }

          return toReturn;
        })}
      </Pagination>
    </>
  );
};

export default MyPagination;
