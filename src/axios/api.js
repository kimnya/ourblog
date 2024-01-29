import axios from 'axios';

// 게시물리스트 호출
export const articleListRead = async () => {
  const response = axios.get('http://localhost:8081/posting/list', { params: { searchText: '' } });
  return response;
};

//익명유저를 위한 좋아요 호출
export const anonymousLikeCntReadApi = async ({ queryKey }) => {
  const response = axios.get(`http://localhost:8081/heart/anonymous/${queryKey[1]}`);

  return response;
};

//로그인한 유저를 위한 좋아요 호출
export const likeCntReadApi = async ({ queryKey }) => {
  const response = axios.get(`http://localhost:8081/heart/get/${queryKey[1]}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });

  return response;
};

//회원정보 호출
export const getInfo = async () => {
  const response = axios.get('http://localhost:8081/member/info', {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });

  return response;
};

//카테고리 생성 호출

export const createCategory = async () => {
  const response = await axios.post(
    'http://localhost:8081/category/create',
    { categoryName: '' },
    { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } },
  );

  return response; //return 값 넣어주자
};

//카테고리 삭제 호출
export const deleteCategory = async (categoryId) => {
  const response = await axios.delete(`http://localhost:8081/category/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response;
};

//검색용 아티클 리스트 호촐
export const searchArticleRead = async ({ queryKey }) => {
  const response = await axios.get('http://localhost:8081/posting/list', {
    params: { searchText: `${queryKey[1]}` },
  });
  return response;
};

//회원용 아티클 전체리스트 호출
export const userArticleRead = async () => {
  const response = await axios.get('http://localhost:8081/category/all', {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });
  return response;
};

// 아티클 상세보기 호촐
export const articleDetailRead = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:8081/posting/${queryKey[1]}`);
  return response;
};

//회원용 상세보기 좋아요 호출
export const userLikeCntRead = async ({ queryKey }) => {
  const response = axios.get(`http://localhost:8081/heart/get/${queryKey[1]}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });
  return response;
};

// 비회원용 상세보기 좋아요 호출
export const AnonymousLikeCntRead = ({ queryKey }) => {
  const response = axios.get(`http://localhost:8081/heart/anonymous/${queryKey[1]}`);

  return response;
};
//좋아요 플러스 호출
export const plusLikeCnt = async ({ queryKey }) => {
  const response = await axios.post(
    `http://localhost:8081/heart/post/${queryKey[1]}`,
    {}, //post api호출에서 body부분 명시해야함 안하면 500에러
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    },
  );
  return response;
};
//좋아요 마이너스 호출
export const minusLikeCnt = async ({ queryKey }) => {
  const response = await axios.delete(
    `http://localhost:8081/heart/delete/${queryKey[1]}`,

    {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    },
  );
  return response;
};

//게시물포스팅 호출
export const postContent = async ({ title: title, content: content, nickName: nickname, categoryId: categoryId }) => {
  const reponse = axios.post(
    'http://localhost:8081/posting/create',
    {
      title: title,
      content: content,
      nickName: nickname,
      categoryId: categoryId,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Access-Control-Allow-Origin': 'http://localhost:8081/',
      },
    },
  );
  return reponse;
};

//프로필 조회 호출
export const getProfile = async () => {
  const response = await axios.get('http://localhost:8081/member/myPage', {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });

  return response;
};

export const deleteProfile = async () => {
  console.log('호출');
  const response = await axios.delete('http://localhost:8081/profile/member', {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });

  return response;
};

//닉네임 수정 호출
export const editNicknameProfile = async (data) => {
  console.log('호출');
  const response = await axios.patch(
    'http://localhost:8081/profile/nicknameUpdate',
    { nickname: data },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 'Content-Type': 'application/json' },
    },
  );

  return response;
};

//이메일 수정 호출
export const editEmailProfile = async (data) => {
  console.log('호출');
  const response = await axios.patch(
    'http://localhost:8081/profile/emailUpdate',
    { email: data },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 'Content-Type': 'application/json' },
    },
  );

  return response;
};

//비밀번호 수정 호출
export const editPasswordProfile = async (data) => {
  console.log('호출');
  const response = await axios.patch(
    'http://localhost:8081/profile/passwordUpdate',
    { newPassword: data },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 'Content-Type': 'application/json' },
    },
  );

  return response;
};
// = useQuery({
//     queryKey:,
//     queryFn:
//   })
