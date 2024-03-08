# our blog team project

## vite 사용이유

1. CRA는 JavaScript로 구성된 Webpack을 사용하는데 속도가 느린편입니다. 평소에는 못느낄 수 있지만 처리해야 할 코드의 양이 많아질 수록 느린 속도를 채감할 수 있습니다.
2. Vite는 초기에 전체 앱을 번들링하고 변경된 파일만 수정한다. 그래서 속도가 빠르다.

## vite 설치하는 방법

npm 7+

1. npm create vite@latest ${디렉터리 명} -- --template ${템플릿 명}
2. cd 디렉터리명 입력 후 npm i를 입력하고 기본 라이브러리 의존 설치를 진행한다.
3. npm run dev로 실행

## prettier 옵션 설명

{
"bracketSpacing": true, ->객체의 양 끝 간격을 사용할지 여부 기본값 true

"jsxBracketSameLine": false, ->jsx 한줄표기 사용여부

"jsxSingleQuote": true, -> JSX에 singe 쿼테이션 사용 여부

"singleQuote": true,-> 큰따옴표 대신 작은 따옴표 사용여부 기본값 true

"proseWrap": "preserve",- markdown 텍스트의 줄바꿈 방식 (v1.8.2)

always- 인쇄 폭을 초과하는 경우 산문을 포장하십시오.
never- 산문의 각 블록을 한 줄로 풀어보세요.
preserve- 아무것도 하지 말고, 산문을 그대로 두세요.v1.9.0에서 처음 사용 가능

"semi": true, ->세미콜론 필수 사용여부 기본값 true
"printWidth": 120, ->코드가 보여지는 너비 기본값 80
"endOfLine": "lf",-> 코드라인 끝을 표현하는 방법

if = 줄바꿈만 사용(/n) Linux 및 macOS 및 git repos 내부에서 공통
crlf = 캐리지 리턴 + 줄바꿈 문자 Windows에서 공통으로 사용
cr = 캐리지 리턴 문자만 사용 매우 드물게 사용됨
auto 기존 줄 끝 유지

"useTabs": false, ->띄어쓰기 대신 탭으로 조정 기본값 false 일반적으로 x
"tabWidth": 2, -> 들여쓰기 간격 기본값 2
"trailingComma": "all", ->후행쉽표의 사용 조건 기본값 es5

none = 안쓴다.
es5 = 객체,배열 후행만 쓴다.
all = 객체,배열,매개변수 후행에 쓴다.

"arrowParens": "always" -> 화살표 함수의 매개변수 표시형태 기본값 always

always =매개변수를 항상 ()로 묶는다.
avoid = 매개변수를 ()로 안묶는다.

}

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
