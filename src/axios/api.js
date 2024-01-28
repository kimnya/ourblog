import axios from 'axios';

// 게시물리스트 호출
export const articleListLoad = async () => {
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

// = useQuery({
//     queryKey:,
//     queryFn:
//   })
