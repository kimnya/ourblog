# our blog team project

## vite 사용이유

1. CRA는 JavaScript로 구성된 Webpack을 사용하는데 속도가 느린편입니다. 평소에는 못느낄 수 있지만 처리해야 할 코드의 양이 많아질 수록 느린 속도를 채감할 수 있습니다.
2. Vite는 초기에 전체 앱을 번들링하고 변경된 파일만 수정한다. 그래서 속도가 빠르다.

## vite 설치하는 방법

npm 7+

1. npm create vite@latest ${디렉터리 명} -- --template ${템플릿 명}
2. cd 디렉터리명 입력 후 npm i를 입력하고 기본 라이브러리 의존 설치를 진행한다.
3. npm run dev로 실행
