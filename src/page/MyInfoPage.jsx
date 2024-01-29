import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import axios from 'axios';
import Button from '../components/Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteProfile, getProfile } from '../axios/api';
import EditProfile from '../components/editProfile';

const Pp = styled.div`
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
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
  background-color: ${palette.mainGray};
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
  const [toggle, setToggle] = useState({
    nickname: false,
    email: false,
    password: false,
    image: false,
  });

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
  });

  const deleteconFirmButton = () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      deleteMyInfo.mutate();
    }
  };

  const getProfileApi = useQuery({ queryKey: ['getProfile'], queryFn: getProfile });
  console.log(getProfileApi);

  const { data } = getProfileApi.data;

  return (
    <>
      <Pp>
        <MyInfoStyle>
          <Title>MY PAGE</Title>
          <MyBox1>
            <Mybox2>
              <div className='profileBox'>
                <div>
                  <img src={data.imageUrl} alt='' />
                  <p>{data.nickname}</p>
                </div>
                <Button onClick={imagetoggleButton} width='155px' heith='34px'>
                  사진수정
                </Button>
              </div>
              {toggle.image && <EditProfile imagetoggleButton={imagetoggleButton} type='image' />}
              <div className='nicknameBox'>
                {data.nickname}
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
                {data.email}
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
                <Button onClick={deleteconFirmButton} $buttonColor='mainOrange' width='70px' heith='25px'>
                  회원탈퇴
                </Button>
              </div>
            </Mybox2>
          </MyBox1>
        </MyInfoStyle>
      </Pp>
    </>
  );
};

export default MyInfoPage;
