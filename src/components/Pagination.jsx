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

        {Array(numPages)
          .fill()
          .map((_, i) => {
            return (
              <Button
                key={i + 1}
                onClick={() => {
                  setPage(1 + i);
                }}
                aria-current={page === 1 + i ? 'page' : null}
              >
                {1 + i}
              </Button>
            );
          })}
        <Button
          onClick={() => {
            setPage(page + 1);
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
