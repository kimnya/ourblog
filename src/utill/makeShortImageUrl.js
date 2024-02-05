import { storage } from './../fireBase/Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
export const onUploadImage = async (blob, callback = (url, altText) => {}) => {
  const fileName = `${Date.now().toString()}_${blob.name}`;
  const storageRef = ref(storage, `images/${fileName}`); // 1. config에서 가져온 storage내에 파일 넣을 경로

  try {
    const snapshot = await uploadBytes(storageRef, blob); // 2. 위 경로에 이미지파일을 업로드
    const url = await getDownloadURL(snapshot.ref); // 3. 올라간 이미지파일 url을 받아온다.

    callback(url, blob.name); // 4. callback함수 실행하여 에디터에 이미지 업로드
  } catch (error) {
    console.log('error', error);
    alert('이미지 업로드 실패');
  }
};
