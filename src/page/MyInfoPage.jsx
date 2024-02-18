import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import Button from '../components/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteProfile, getProfile } from '../axios/api';
import EditProfile from '../components/EditProfile';
import { useNavigate } from 'react-router-dom';
import { IsToggleCtx } from '../context/IsToggleProvider';

const PageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyInfoStyle = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 506px;
  height: 428px;

  > form {
    .submitButton {
      margin-top: 30px;
      align-self: flex-end;
    }
  }
`;
const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${palette.mainGreen};
  font-weight: bold;
`;

const MyBox1 = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  height: 372px;
  background-color: ${palette.mainGreen};
  border-radius: 16px 16px 0 0;
`;
const Mybox2 = styled(MyBox1)`
  height: 312px;
  padding: 15px;
  background-color: ${({ theme }) => theme.myPageColor};

  /* ${palette.mainGray}; */
  border-radius: 0;
  color: #fff;
  > .profileBox {
    font-size: 32px;
    font-weight: bold;
    > div {
      width: 33.333333%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        display: inline-block;
        width: 84px;
        height: 57px;
      }
    }
  }
  > .profileBox,
  .nicknameBox,
  .emailBox,
  .passwordBox,
  .deleteBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    margin-bottom: 25px;
  }

  .profileBox {
    > div {
      width: 100%;

      > p {
        width: 100%;
        margin-left: 10px;
      }
    }
  }
`;

const MyInfoPage = () => {
  const queryClient = useQueryClient();
  const { toggle, setToggle } = useContext(IsToggleCtx);
  const navigate = useNavigate();

  const nicknametoggleButton = () => {
    setToggle((prev) => ({
      ...prev,
      nickname: !prev.nickname,
    }));

    console.log(toggle);
  };
  const emailtoggleButton = () => {
    setToggle((prev) => ({
      ...prev,
      email: !prev.email,
    }));

    console.log(toggle);
  };
  const passwordtoggleButton = () => {
    setToggle((prev) => ({
      ...prev,
      password: !prev.password,
    }));

    console.log(toggle);
  };
  const imagetoggleButton = () => {
    setToggle((prev) => ({
      ...prev,
      image: !prev.image,
    }));

    console.log(toggle);
  };

  const deleteMyInfo = useMutation({
    mutationFn: deleteProfile,
    enabled: false,
    onSuccess: async () => {
      localStorage.clear();
      sessionStorage.removeItem('accessToken');
      setToggle((prev) => ({ ...prev, logined: !prev.logined }));
      await queryClient.invalidateQueries({ queryKey: ['adminMember'] });
      await queryClient.invalidateQueries({ queryKey: ['articleRead'] });
      console.log('token', localStorage.getItem('nickname'));
      console.log('token', sessionStorage.getItem('accessToken'));
    },
  });

  const deleteconFirmButton = () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      deleteMyInfo.mutate();
      navigate('/');
    }
  };
  const key = sessionStorage.getItem('accessToken');
  const getProfileApi = useQuery({ queryKey: ['getProfile', key], queryFn: getProfile });
  console.log(getProfileApi);

  return (
    <>
      <PageStyle>
        <MyInfoStyle>
          <Title>MY PAGE</Title>
          <MyBox1>
            <Mybox2>
              <div className='profileBox'>
                <div>
                  <img src={getProfileApi.data.data.imageUrl} alt={`${getProfileApi.data.data.nickname}의 썸네일`} />
                  <p>{getProfileApi.data.data.nickname}</p>
                </div>
                <Button onClick={imagetoggleButton} width='155px' $heigth='34px'>
                  사진수정
                </Button>
                {toggle.image && <EditProfile imagetoggleButton={imagetoggleButton} type='image' />}
              </div>
              <div className='nicknameBox'>
                {getProfileApi.data.data.nickname}
                <Button
                  id='nickname'
                  onClick={() => {
                    nicknametoggleButton();
                  }}
                >
                  수정
                </Button>
                {toggle.nickname && <EditProfile nicknametoggleButton={nicknametoggleButton} type='nickname' />}
              </div>
              <div className='emailBox'>
                {getProfileApi.data.data.email}
                <Button onClick={emailtoggleButton}>수정</Button>
                {toggle.email && <EditProfile emailtoggleButton={emailtoggleButton} type='email' />}
              </div>
              <div className='passwordBox'>
                <span>***********</span>
                <Button onClick={passwordtoggleButton}>수정</Button>
                {toggle.password && <EditProfile passwordtoggleButton={passwordtoggleButton} type='password' />}
              </div>

              <div className='deleteBox'>
                <p>계정 삭제를 원하신다면 눌러주세요.</p>
                <Button onClick={deleteconFirmButton} $buttonColor='mainOrange' width='70px' $heigth='25px'>
                  회원탈퇴
                </Button>
              </div>
            </Mybox2>
          </MyBox1>
        </MyInfoStyle>
      </PageStyle>
    </>
  );
};

export default MyInfoPage;
