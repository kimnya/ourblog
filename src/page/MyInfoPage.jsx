import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palette } from '../styles/palette';
import axios from 'axios';
import Button from '../components/Button';

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
  .naicknameBox,
  .emailBox,
  .passwordBox,
  .deleteBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
  }
`;

const MyInfoPage = () => {
  const [myInfo, setMyInfo] = useState([]);
  const getInfo = async () => {
    await axios
      .get('http://localhost:8081/member/myPage', {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      })
      .then((response) => {
        setMyInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        error.message;
      });
  };
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      getInfo();
    }
  }, [localStorage.getItem('accessToken')]);
  return (
    <>
      <MyInfoStyle>
        <Title>MY PAGE</Title>

        <MyBox1>
          <Mybox2>
            <div className='profileBox'>
              <div>
                <img src={myInfo.imageUrl} alt='' />
                <p>{myInfo.nickname}</p>
              </div>
              <Button width='155px' heith='34px'>
                사진수정
              </Button>
            </div>
            <div className='naicknameBox'>
              {myInfo.nickname}
              <Button>수정</Button>
            </div>
            <div className='emailBox'>
              {myInfo.email}
              <Button>수정</Button>
            </div>
            <div className='passwordBox'>
              <span>***********</span>
              <Button>수정</Button>
            </div>

            <div className='deleteBox'>
              <p>계정 삭제를 원하신다면 눌러주세요.</p>
              <Button $buttonColor='mainOrange' width='70px' heith='25px'>
                회원탈퇴
              </Button>
            </div>
          </Mybox2>
        </MyBox1>
      </MyInfoStyle>
    </>
  );
};

export default MyInfoPage;
