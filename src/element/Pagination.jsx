import React from 'react';
import Button from './Button';
import { PageStyle } from './element.styles';

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
