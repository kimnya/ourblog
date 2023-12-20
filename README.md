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
