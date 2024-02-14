import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import styled from 'styled-components';
import { darken } from '../styles/ColorMixin';

const PageStyle = styled.div`
  display: flex;
  margin: 0 auto;
  [aria-current] {
    ${darken(0.2)};
  }
`;

const Pagination = ({ limit, page, totalPosts, setPage }) => {
  const numPages = Math.ceil(totalPosts / limit);
  const [currPage, setCurrPage] = useState(page);
  let firstNum = currPage - (currPage % 5) + 1;
  let lastNum = currPage - (currPage % 5) + 5;

  return (
    <>
      <PageStyle>
        <Button
          onClick={() => {
            setPage(page - 1);
            setCurrPage(page - 2);
          }}
          disabled={page === 1}
        >
          &lt;
        </Button>
        <Button onClick={() => setPage(firstNum)} aria-current={page === firstNum ? 'page' : null}>
          {firstNum}
        </Button>
        {Array(4)
          .fill()
          .map((_, i) => {
            if (i <= 2) {
              return (
                <Button
                  key={i + 1}
                  onClick={() => {
                    setPage(firstNum + 1 + i);
                  }}
                  aria-current={page === firstNum + 1 + i ? 'page' : null}
                >
                  {firstNum + 1 + i}
                </Button>
              );
            } else if (i >= 3) {
              return (
                <Button key={i + 1} onClick={() => setPage(lastNum)} aria-current={page === lastNum ? 'page' : null}>
                  {lastNum}
                </Button>
              );
            }
          })}
        <Button
          onClick={() => {
            setPage(page + 1);
            setCurrPage(page);
          }}
          disabled={page === numPages}
        >
          &gt;
        </Button>
      </PageStyle>
    </>
  );
};

export default Pagination;
