# our blog team project

## vite 사용이유

---

- CRA는 JavaScript로 구성된 Webpack을 사용하는데 속도가 느린편입니다. 평소에는 못느낄 수 있지만 처리해야 할 코드의 양이 많아질 수록 느린 속도를 채감할 수 있습니다.
- Vite는 초기에 전체 앱을 번들링하고 변경된 파일만 수정한다. 그래서 속도가 빠르다.

## prettier 옵션 설명

---

"bracketSpacing": true,

"jsxBracketSameLine": false,

"jsxSingleQuote": true,

"singleQuote": true,

"proseWrap": "preserve",

"semi": true,
"printWidth": 120,
"endOfLine": "lf",

"useTabs": false,
"tabWidth": 2,
"trailingComma": "all",

"arrowParens": "always"

## 사용된 주요 라이브러리

---

- **ReactJS 18.2.0**: 생산성이 좋고 Component별로 관리하여 유지보수가 편하고 가독성이 좋습니다.

- **TanStack Query 5.0.0**: data fetch에 관련된 많은 기능들을 제공합니다. 직접 핸들링 하는 것 보다 생산성이 좋고 직관적입니다.

- **axios**: fetch API보다 예외처리가 쉽고 baseUrl,default header를 설정,json serialize, deserialize 생략할 수 있습니다.

- **toast-ui/react-editor" 3.2.3**: react에 맞는 라이브러리 설치가 가능하고 미리보기 기능과 markDown을 지원하기 때문에 사용하였습니다.

- **styled-components 6.1.3**:CSS의 컴포넌트화(모듈성)가 가능하고 JavaScript와 CSS 사이의 상수와 함수를 쉽게 공유 할 수 있어 사용하게 됐습니다.

![KakaoTalk_20240307_212743303](https://github.com/kimnya/ourblog/assets/141697641/7d1c47c8-42e0-4408-ab3d-f1859d264a5a)//디테일
![KakaoTalk_20240307_212745448](https://github.com/kimnya/ourblog/assets/141697641/cd19957a-a297-4cf9-a67d-59a0db48e0a3)//다크모드
![KakaoTalk_20240307_212748387](https://github.com/kimnya/ourblog/assets/141697641/4401d77a-0dd8-465a-9713-e6dc21b89bd2)
//글작성 페이지
![KakaoTalk_20240307_212752743](https://github.com/kimnya/ourblog/assets/141697641/b5e5a5c8-fe75-400f-a571-a8bacaee2ecd)//
회원가입
![KakaoTalk_20240307_212755943](https://github.com/kimnya/ourblog/assets/141697641/8b82ab70-a2bb-42c6-aa91-e8ab2dda7d2f)
//메인페이지
![KakaoTalk_20240307_212800093](https://github.com/kimnya/ourblog/assets/141697641/7482ce82-3be2-460d-8443-6f25dfedc7b5)//로그인

![KakaoTalk_20240307_212805215](https://github.com/kimnya/ourblog/assets/141697641/9f650580-5fc9-4547-bad1-aeeb219910ab)//내블로그

![KakaoTalk_20240307_212814301](https://github.com/kimnya/ourblog/assets/141697641/997e155c-e6a9-4266-9005-a6591a624a68)
//마이페이지

![KakaoTalk_20240307_214322531](https://github.com/kimnya/ourblog/assets/141697641/663a0839-d44b-436b-9b51-5cf346f8f84b)//관리자
![KakaoTalk_20240307_214325473](https://github.com/kimnya/ourblog/assets/141697641/e6f2c93b-a803-43d3-bbbd-ac9d4cb3ba65)//댓글
![ourblog - Chrome 2024-03-08 오후 8_06_25](https://github.com/kimnya/ourblog/assets/141697641/8c1c84fe-b086-49ff-b5e6-a701888a5fac)//카테고리

![Member](https://github.com/Seoha95/ourblog/assets/107228582/4b4056ba-bb1e-42c5-af66-823252da630d)//멤버
![Admin](https://github.com/Seoha95/ourblog/assets/107228582/4e0ae996-98e3-4bb6-a852-05b56d8881c4)//어드민
![Profile](https://github.com/Seoha95/ourblog/assets/107228582/d9071551-c6a4-420f-930e-2c5a2c7cbd69)//프로파일  
![Posting](https://github.com/Seoha95/ourblog/assets/107228582/fb06c28c-c29a-4bdd-98e1-9cb257cadaf9)//포스팅
![Heart](https://github.com/Seoha95/ourblog/assets/107228582/00713183-ee70-41ae-b592-9c8019c93b23)//하트  
![Comment](https://github.com/Seoha95/ourblog/assets/107228582/acd8a181-89f0-4569-924c-e0ad96319d9a)//댓글  
![Category](https://github.com/Seoha95/ourblog/assets/107228582/767dc16f-a054-4eaf-8e46-fd7a4704c88a)//카테고리
