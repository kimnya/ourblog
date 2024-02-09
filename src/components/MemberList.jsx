import React from 'react';
import styled from 'styled-components';
import { adminGetMember } from '../axios/api';
import MemberBox from './MemberBox';
import { useQuery } from '@tanstack/react-query';

const MemberListStyle = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-content: space-between;
  width: 1237px;
  height: 710px;
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
        {/* {data &&
          data.data.filter((member) => member.memberId > 1).map(member) =>{
           <MemberBox key={member.memberId} member={member} />;
          }} */}
      </MemberListStyle>
    </>
  );
};

export default MemberList;
