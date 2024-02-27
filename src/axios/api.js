import axios from 'axios';
import { getCookie, setCookie } from '../utill/cookie';
import { baseUrl } from '../utill/baseUrl';

//회원가입 호출
export const registerSubmit = async (data) => {
  const response = await axios.post(
    `${baseUrl}/member/join`,
    {
      name: data.userName,
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    },
    {},
  );
  return response;
};

//아이디 중복체크 호출
export const checkEmail = async (email) => {
  const response = await axios.get(`${baseUrl}/member/checkEmail`, {
    params: { email: email },
  });
  return response;
};

export const checkNickname = async (nickname) => {
  const response = await axios.get(`${baseUrl}/member/checkNickname`, {
    params: { nickname: nickname },
  });

  return response;
};

//로그인 호출
export const loginSubmit = async (data) => {
  const response = await axios.post(`${baseUrl}/member/login`, {
    email: data.email,
    password: data.password,
  });

  return response;
};

// 게시물리스트 호출
export const articleListRead = async () => {
  const response = await axios.get(`${baseUrl}/posting/list`, {
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
    `${baseUrl}/member/reissue`,
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
    .get(`${baseUrl}/member/myPage`, {
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
  const response = await axios.get(`${baseUrl}/heart/anonymous/${queryKey[1]}`);
  return response;
};

//로그인한 유저를 위한 좋아요 호출
export const likeCntReadApi = async ({ queryKey }) => {
  const response = await axios.get(`${baseUrl}/heart/user/${queryKey[1]}`, {
    headers: { Authorization: `Bearer ${queryKey[2]}` },
  });
  return response;
};

//카테고리 리스트 호출
export const getCategories = async () => {
  const response = await axios.get(`${baseUrl}/member/categories`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });

  return response;
};

//카테고리 생성 호출
export const createCategory = async () => {
  const response = await axios.post(
    `${baseUrl}/category/create`,
    { categoryName: '' },
    { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` } },
  );

  return response;
};

//카테고리 수정 호출
export const submitName = async ({ categoryId, editName }) => {
  console.log('api 호출 editName', editName);
  const response = await axios.patch(
    `${baseUrl}/category/${categoryId}`,
    { categoryName: editName },
    { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` } },
  );
  return response;
};

//카테고리 삭제 호출
export const deleteCategory = async (categoryId) => {
  const response = await axios.delete(`${baseUrl}/category/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });
  return response;
};

//검색용 아티클 리스트 호촐
export const searchArticleRead = async ({ queryKey }) => {
  const response = await axios.get(`${baseUrl}/posting/list`, {
    params: { searchText: `${queryKey[1]}` },
  });

  return response;
};

//회원용 아티클 전체리스트 호출
export const userArticleRead = async () => {
  const response = await axios.get(`${baseUrl}/category/all`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
  });
  return response;
};

// 아티클 상세보기 호촐
export const articleDetailRead = async ({ queryKey }) => {
  const response = await axios.get(`${baseUrl}/posting/detail/${queryKey[1]}`);
  return response;
};

//회원용 상세보기 좋아요 호출
export const userLikeCntRead = async ({ queryKey }) => {
  const response = await axios.get(`${baseUrl}/heart/user/${queryKey[1]}`, {
    headers: { Authorization: `Bearer ${queryKey[2]}` },
  });
  return response;
};

// 비회원용 상세보기 좋아요 호출
export const AnonymousLikeCntRead = async ({ queryKey }) => {
  const response = await axios.get(`${baseUrl}/heart/anonymous/${queryKey[1]}`);

  return response;
};
//좋아요 플러스 호출
export const plusLikeCnt = async (postId) => {
  console.log('성공');
  const response = await axios.post(
    `${baseUrl}/heart/post/${postId}`,
    {},
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
    },
  );

  return response;
};
//좋아요 마이너스 호출
export const minusLikeCnt = async (postId) => {
  const response = await axios.delete(
    `${baseUrl}/heart/delete/${postId}`,

    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
    },
  );

  return response;
};

//게시물포스팅 호출
export const postContent = async (data) => {
  const response = await axios.post(
    `${baseUrl}/posting/create`,
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
  return response;
};

//포스팅 수정호출
export const editPost = async (data) => {
  const reponse = await axios.put(
    `${baseUrl}/posting/${data.postId}`,
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
  const reponse = axios.delete(`${baseUrl}/posting/${postId}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });

  return reponse;
};

//회원탈퇴 호출
export const deleteProfile = async () => {
  const response = await axios.delete(`${baseUrl}/profile/member`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
  });

  return response;
};

//닉네임 수정 호출
export const editNicknameProfile = async (data) => {
  console.log('호출');
  const response = await axios.patch(
    `${baseUrl}/profile/nicknameUpdate`,
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
    `${baseUrl}/profile/emailUpdate`,
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
    `${baseUrl}/profile/passwordUpdate`,
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
    `${baseUrl}/profile/imageUpdate`,
    { imageUrl: data },
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`, 'Content-Type': 'application/json' },
    },
  );

  return response;
};

//댓글 호출
export const articleCommentRead = async (postId, setComments) => {
  const response = await axios.get(`${baseUrl}/comment/list/${postId}`);

  setComments(response.data);

  return response;
};

//댓글 작성 호출
export const articleCommentCreate = async (data) => {
  const response = await axios.post(
    `${baseUrl}/comment/create/${data['postId']}`,
    { reply: data.reply },
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
    },
  );
  const newList = await axios.get(`${baseUrl}/comment/list/${data['postId']}`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
  });

  data.setComments(newList.data);
  return response;
};

//댓글 삭제 호출
export const articleCommentDelete = async (commentId, setComments, postId) => {
  const response = await axios.delete(`${baseUrl}/comment/delete/${commentId}`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
  });

  const newList = await axios.get(`${baseUrl}/comment/list/${postId}`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
  });

  setComments(newList.data);

  return response;
};

//댓글 수정 호출
export const articleCommentEdit = async (commentId, reply, setComments, postId) => {
  const response = await axios.put(
    `${baseUrl}/comment/update/${commentId}`,
    {
      reply: reply,
    },
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
    },
  );

  const newList = await axios.get(`${baseUrl}/comment/list/${postId}`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
  });

  setComments(newList.data);

  return response;
};
//어드민 멤버리스트 호출
export const adminGetMember = async () => {
  const response = await axios.get(`${baseUrl}/admin/members`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
  });

  return response;
};

//어드민 멤버삭제 호출
export const adminDeleteMember = async (memberId) => {
  const response = await axios.delete(`${baseUrl}/admin/memberDelete/${memberId}`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
  });

  console.log('삭제api호출');

  return response;
};
