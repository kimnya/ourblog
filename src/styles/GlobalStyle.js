import { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`

*{
    box-sizing: border-box;
}


html,
body,
div,
span,
h1,
h2,
h3,
h4,
h5,
h6,
p,
a,
code,
blockquote,
abbr,
sub,
sup,
time,
em,
strong,
img,
q,
dl,
dt,
dd,
address,
cite,
ul,
ol,
li,
header,
section,
footer,
article,
nav,
aside,
table,
caption,
thead,
tbody,
tfoot,
tr,
td,
th,
form,
fieldset,
legend,
label {
	margin: 0;
	padding: 0;
}

ul,
ol,
li {
	list-style: none;
}
q {
	quotes: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
textarea {
	resize: none;
}

a:link {
	
	text-decoration: none;
}
a:visited {
	color: ${({ theme }) => theme.txtColor};
}
a:hover {
	color: ${({ theme }) => theme.txtColor};
}
a:active {
	color: ${({ theme }) => theme.txtColor};
}

em,
address {
	font-style: normal;
}
hr,
caption,
legend {
	display: none;
}
img,
fieldset {
	border: none;
}
label,
button {
	cursor: pointer;
	color: ${({ theme }) => theme.txtColor}; 
}

body {
	width: 100%;
	height: 100%;
	background: ${({ theme }) => theme.bgColor};
	color: ${({ theme }) => theme.txtColor}; 
	font-size: 12px;
	line-height: 1.2;
	font-family: 'Nanum Gothic', 돋움, 굴림;
	a{
		color: ${({ theme }) => theme.txtColor};
	}	
}



.text-center {
	height: 100px;
	line-height: 100px;
	text-align: center;
}

.text-hide {
	display: none;
}

/* 스크린리더가 읽을 수 있어 접근성이 향상됨 */
.sr-only {
	position: absolute;
	left: -9999px;
}

.clearfix {
	*zoom: 1;
}

.clearfix:after {
	display: block;
	clear: both;
	content: '';
}

`;
