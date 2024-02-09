import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import { adminDeleteMember } from '../axios/api';

const MemberBox = ({ member }) => {
  const queryClient = useQueryClient();
  const { memberId, nickname, email, name } = member;
  const adminDeleteMemberApi = useMutation({
    mutationFn: adminDeleteMember,
    onSuccess: async () => {
      console.log('삭제성공');
      await queryClient.invalidateQueries({ queryKey: ['adminMember'] });
    },
  });
  return (
    <>
      <div>
        {name}
        {email}
        {nickname}

        <Link
          onClick={() => {
            adminDeleteMemberApi.mutate(memberId);
          }}
        >
          삭제
        </Link>
      </div>
    </>
  );
};

export default MemberBox;
