import axios from 'axios';

// 게시물리스트 API
export const articleListLoad = async () => {
  const response = axios.get('http://localhost:8081/posting/list', { params: { searchText: '' } });
  return response;
};

//익명유저를 위한 좋아요 호출
export const anonymousLikeCntReadApi = async (postId) => {
  const response = axios.get(`http://localhost:8081/heart/anonymous/${postId}`);
  console.log(response.data);
  return response;
};

//로그인한 유저를 위한 좋아요 호출
export const likeCntReadApi = async (postId) => {
  const response = axios.get(`http://localhost:8081/heart/get/${postId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  });
  console.log(response.data);
  return response;
};

// = useQuery({
//     queryKey:,
//     queryFn:
//   })
