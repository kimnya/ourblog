import React from 'react';
import { adminGetMember } from '../../axios/api';
import MemberBox from './MemberBox';
import { useQuery } from '@tanstack/react-query';
import { palette } from '../../styles/palette';
import { MemberListStyle } from './member.styles';

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
          <thead>
            <tr align='center'>
              <th>회원번호</th>
              <th>회원이름</th>
              <th>이메일</th>
              <th>닉네임</th>
              <th>{''}</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data
                .filter((member) => member.memberId > 1)
                .map((member) => {
                  return <MemberBox key={member.memberId} member={member} />;
                })}
          </tbody>
        </table>
      </MemberListStyle>
    </>
  );
};

export default MemberList;
