import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import { adminDeleteMember } from '../../axios/api';
import { MemberBoxStyle } from './member.styles';

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
      <MemberBoxStyle align={'center'}>
        <td>{memberId}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{nickname}</td>

        <td>
          <Link
            onClick={() => {
              if (confirm('정말로 삭제하시겠습니까?')) {
                adminDeleteMemberApi.mutate(memberId);
              }
            }}
          >
            삭제
          </Link>
        </td>
      </MemberBoxStyle>
    </>
  );
};

export default MemberBox;
