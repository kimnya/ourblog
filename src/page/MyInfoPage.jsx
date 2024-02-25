import React, { useContext } from 'react';
import Button from '../element/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteProfile, getProfile } from '../axios/api';
import EditProfile from '../components/member/EditProfile';
import { useNavigate } from 'react-router-dom';
import { IsToggleCtx } from '../context/IsToggleProvider';
import { MyBox1, MyInfoStyle, Mybox2, PageStyle, ProfileTitle } from './page.styles';

const MyInfoPage = () => {
  const queryClient = useQueryClient();
  const { toggle, setToggle } = useContext(IsToggleCtx);
  const navigate = useNavigate();

  const nicknametoggleButton = () => {
    setToggle((prev) => ({
      ...prev,
      nickname: !prev.nickname,
    }));
  };
  const emailtoggleButton = () => {
    setToggle((prev) => ({
      ...prev,
      email: !prev.email,
    }));
  };
  const passwordtoggleButton = () => {
    setToggle((prev) => ({
      ...prev,
      password: !prev.password,
    }));
  };
  const imagetoggleButton = () => {
    setToggle((prev) => ({
      ...prev,
      image: !prev.image,
    }));
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

  const src = getProfileApi.data.data.imageUrl.match('https://firebase');

  return (
    <>
      <PageStyle>
        <MyInfoStyle>
          <ProfileTitle>MY PAGE</ProfileTitle>
          <MyBox1>
            <Mybox2>
              <div className='profileBox'>
                <div>
                  <img
                    src={
                      src
                        ? getProfileApi.data.data.imageUrl
                        : `https://ourblog-beta.vercel.app/${getProfileApi.data.data.imageUrl}`
                    }
                    alt={`${getProfileApi.data.data.nickname}의 썸네일`}
                  />
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
