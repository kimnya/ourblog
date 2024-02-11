import React from 'react';
import styled from 'styled-components';
import { adminGetMember } from '../axios/api';
import MemberBox from './MemberBox';
import { useQuery } from '@tanstack/react-query';
import { palette } from '../styles/palette';

const MemberListStyle = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 1237px;
  font-size: 24px;
`;

const MemberList = () => {
  const adminGetMemberApi = useQuery({
    queryKey: ['adminMember'],
    queryFn: adminGetMember,
  });
  console.log(adminGetMemberApi);
  const { data } = adminGetMemberApi;
  return (
    <>
      <MemberListStyle>
        <table border='1' height='100' bordercolor={palette.mainGreen}>
          <tr align='center'>
            <th>회원번호</th>
            <th>회원이름</th>
            <th>이메일</th>
            <th>닉네임</th>
            <th>{''}</th>
          </tr>

          {data &&
            data.data
              .filter((member) => member.memberId > 1)
              .map((member) => {
                return <MemberBox key={member.memberId} member={member} />;
              })}
        </table>
      </MemberListStyle>
    </>
  );
};

export default MemberList;
