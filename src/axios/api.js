import axios from 'axios';
import { getCookie, setCookie } from '../components/cookie';

// 게시물리스트 호출
export const articleListRead = async () => {
  const response = await axios.get('/posting/list', {
    params: { searchText: '' },
  });
  return response;
};

//리프레쉬토큰으로 accessToken 재 호출
export const recallToken = async () => {
  console.log('리이슈호출');
  let refreshToken = getCookie('refreshToken');
  let accessToken = sessionStorage.getItem('accessToken');
  const response = await axios.post(
    'http://localhost:8081/member/reissue',
    {
      refreshToken: refreshToken,
      accessToken: accessToken,
    },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    },
  );
  console.log('reissue 성공 ');
  accessToken = response.data.accessToken;
  refreshToken = response.data.refreshToken;
  sessionStorage.setItem('accessToken', accessToken);
  setCookie('refreshToken', refreshToken);

  return response;
};

//프로필 호출
export const getProfile = async ({ queryKey }) => {
  const response = await axios
    .get('http://localhost:8081/member/myPage', {
      headers: { Authorization: `Bearer ${queryKey[1]}` },
    })
    .catch((error) => {
      if (error.status === 401) {
        console.log('401오류');
        recallToken();
      }
    });

  return response;
};

//익명유저를 위한 좋아요 호출
export const anonymousLikeCntReadApi = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:8081/heart/anonymous/${queryKey[1]}`);
  return response;
};

//로그인한 유저를 위한 좋아요 호출
export const likeCntReadApi = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:8081/heart/user/${queryKey[1]}`, {
    headers: { Authorization: `Bearer ${queryKey[2]}` },
  });
  return response;
};

//카테고리 리스트 호출
export const getCategories = async () => {
  const response = await axios.get('http://localhost:8081/member/categories', {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });

  return response;
};

//카테고리 생성 호출
export const createCategory = async () => {
  const response = await axios.post(
    'http://localhost:8081/category/create',
    { categoryName: '' },
    { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` } },
  );

  return response; //return 값 넣어주자
};

//카테고리 삭제 호출
export const deleteCategory = async (categoryId) => {
  const response = await axios.delete(`http://localhost:8081/category/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });
  return response;
};

//검색용 아티클 리스트 호촐
export const searchArticleRead = async ({ queryKey }) => {
  const response = await axios.get('http://localhost:8081/posting/list', {
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8081', // 서버 domain
    },
    params: { searchText: `${queryKey[1]}` },
  });

  return response;
};

//회원용 아티클 전체리스트 호출
export const userArticleRead = async () => {
  const response = await axios.get('http://localhost:8081/category/all', {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
  });
  return response;
};

// 아티클 상세보기 호촐
export const articleDetailRead = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:8081/posting/detail/${queryKey[1]}`);
  return response;
};

//회원용 상세보기 좋아요 호출
export const userLikeCntRead = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:8081/heart/user/${queryKey[1]}`, {
    headers: { Authorization: `Bearer ${queryKey[2]}` },
  });
  return response;
};

// 비회원용 상세보기 좋아요 호출
export const AnonymousLikeCntRead = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:8081/heart/anonymous/${queryKey[1]}`);

  return response;
};
//좋아요 플러스 호출
export const plusLikeCnt = async (postId) => {
  console.log('성공');
  const response = await axios.post(
    `http://localhost:8081/heart/post/${postId}`,
    {}, //post api호출에서 body부분 명시해야함 안하면 500에러
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
    },
  );

  return response;
};
//좋아요 마이너스 호출
export const minusLikeCnt = async (postId) => {
  const response = await axios.delete(
    `http://localhost:8081/heart/delete/${postId}`,

    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
    },
  );

  return response;
};

//게시물포스팅 호출
export const postContent = async (data) => {
  const reponse = axios.post(
    'http://localhost:8081/posting/create',
    {
      title: data.title,
      content: data.content,
      nickname: data.nickname,
      categoryId: data.categoryId,
    },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    },
  );
  return reponse;
};

//포스팅 수정호출
export const editPost = async (data) => {
  const reponse = axios.put(
    `http://localhost:8081/posting/${data.postId}`,
    {
      title: data.title,
      content: data.content,
    },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    },
  );

  return reponse;
};
//포스팅 삭제 호출
export const deletePost = async (postId) => {
  const reponse = axios.delete(`http://localhost:8081/posting/${postId}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });

  return reponse;
};

//회원탈퇴 호출
export const deleteProfile = async () => {
  const response = await axios.delete('http://localhost:8081/profile/member', {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
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
      headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, 'Content-Type': 'application/json' },
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
      headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, 'Content-Type': 'application/json' },
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
      headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, 'Content-Type': 'application/json' },
    },
  );

  return response;
};

//프로필사진 수정 호출
export const editimageProfile = async (data) => {
  console.log('호출');
  const response = await axios.patch(
    'http://localhost:8081/profile/imageUpdate',
    { imageUrl: data },
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, 'Content-Type': 'application/json' },
    },
  );

  return response;
};

//댓글 호출
export const articleCommentRead = async (postId, setComments) => {
  const response = await axios.get(`http://localhost:8081/comment/list/${postId}`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
  });

  setComments(response.data);

  return response;
};

//댓글 작성 호출
export const articleCommentCreate = async (data) => {
  const response = await axios.post(
    `http://localhost:8081/comment/create/${data['postId']}`,
    { reply: data.reply },
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
    },
  );
  const newList = await axios.get(`http://localhost:8081/comment/list/${data['postId']}`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
  });

  data.setComments(newList.data);
  return response;
};

//댓글 삭제 호출
export const articleCommentDelete = async (commentId, setComments, postId) => {
  const response = await axios.delete(`http://localhost:8081/comment/delete/${commentId}`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
  });

  const newList = await axios.get(`http://localhost:8081/comment/list/${postId}`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
  });

  setComments(newList.data);

  return response;
};

//댓글 수정 호출
export const articleCommentEdit = async (commentId, reply, setComments, postId) => {
  const response = await axios.put(
    `http://localhost:8081/comment/update/${commentId}`,
    {
      reply: reply,
    },
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
    },
  );

  const newList = await axios.get(`http://localhost:8081/comment/list/${postId}`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
  });

  setComments(newList.data);

  return response;
};
//어드민 멤버리스트 호출
export const adminGetMember = async () => {
  const response = await axios.get(`http://localhost:8081/admin/members`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
  });

  return response;
};

//어드민 멤버삭제 호출
export const adminDeleteMember = async (memberId) => {
  const response = await axios.delete(`http://localhost:8081/admin/memberDelete/${memberId}`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
  });

  console.log('삭제api호출');

  return response;
};

// = useQuery({
//     queryKey:,
//     queryFn:
//   })
