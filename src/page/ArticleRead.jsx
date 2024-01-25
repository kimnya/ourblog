import React from 'react';

import styled from 'styled-components';
import { palette } from '../styles/palette';

const ReadPageStyle = styled.div`
  width: 98vw;
  margin: 0 auto;
  border: 3px solid ${palette.mainGreen};
  border-radius: 25px;
`;

const Title = styled.span`
  border: 1px solid #000;
  display: inline-block;
  margin: 0 auto;
`;

const Articleread = () => {
  const content =
    '<p><img src="<p><img src="https://firebasestorage.googleapis.com/v0/b/ourblog-88d6e.appspot.com/o/image%2F1706181307971?alt=media&amp;token=ffb9ef32-ee8d-4606-8bcc-be9c7663fe27"><img src="https://firebasestorage.googleapis.com/v0/b/ourblog-88d6e.appspot.com/o/image%2F1706181313308?alt=media&amp;token=34f2a9a7-b754-4129-8350-926bfe2b74d7"></p><p>dd<img src="https://firebasestorage.googleapis.com/v0/b/ourblog-88d6e.appspot.com/o/image%2F1706181340731?alt=media&amp;token=9c7e340e-cf1a-43f6-9317-a8273f9b8d73"><img src="https://firebasestorage.googleapis.com/v0/b/ourblog-88d6e.appspot.com/o/image%2F1706181346621?alt=media&amp;token=0e1b8c0b-ec6f-40df-9455-1c8cd772c549"><img src="https://firebasestorage.googleapis.com/v0/b/ourblog-88d6e.appspot.com/o/image%2F1706181370585?alt=media&amp;token=79a745c4-a0ec-4557-a9b7-4fb7d72cccd2"><img src="https://firebasestorage.googleapis.com/v0/b/ourblog-88d6e.appspot.com/o/image%2F1706181375891?alt=media&amp;token=bd9fb1d1-22b1-47df-92ee-a69d37739133"><img src="https://firebasestorage.googleapis.com/v0/b/ourblog-88d6e.appspot.com/o/image%2F1706181383387?alt=media&amp;token=da1bc138-fd46-44f1-90b9-7f17e69a926e"><img src="https://firebasestorage.googleapis.com/v0/b/ourblog-88d6e.appspot.com/o/image%2F1706181396267?alt=media&amp;token=264521b6-9bfc-4072-b6fc-32b890eab650"></p>';
  return (
    <>
      <ReadPageStyle>
        <Title>제목부분입니다.</Title>
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </ReadPageStyle>
    </>
  );
};
export default Articleread;
