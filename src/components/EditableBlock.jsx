import React, { forwardRef, useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import styled from 'styled-components';

const EditableBlock = ({ id, tag, html, updatePage, addBlock, deleteBlock }) => {
  const [state, setState] = useState({ htmlBackup: null, html: '', tag: 'p', previousKey: '' });
  const $contentEditable = useRef();

  useEffect(() => {
    setState((prev) => ({ ...prev, html: html, tag: tag }));
    console.log('Mountstatte', state);
  }, []);

  useEffect(() => {
    const htmlChanged = html !== state.html;
    const tagChanged = tag !== state.tag;
    if (htmlChanged || tagChanged) {
      updatePage({
        id: id,
        html: state.html,
        tag: state.tag,
      });
    }
    console.log('UPstatte', state);
  }, [state.html, state.tag]);

  const createContent = (evt) => {
    setState((prev) => ({
      ...prev,
      html: evt.target.value, //evt.target.value == ㅈ저전ㅇ이인ㅂ배 이랗게 떨어져 나옴
    }));
    /*원래 의도대로, setState를 모두 수행하고 싶다면, Queue를 이용하면 된다!
    setState에 함수를 인자로 전달하는 방법을 사용할 수 있다.
    이때, 인자로 전달된 함수는 이전 state 값을 전달 받게 된다.
    이후 해당 함수들은 Queue에 저장 되어 순서대로 실행된다.
    그 결과, Queue에 저장된 함수들이 동기적으로 작동되면서, 모든 setState 구문이 동작하게 된다.*/
  };

  const controllKey = (evt) => {
    if (evt.key === '/') {
      //   setState((prev) => ({ ...prev, htmlBackup: state.html }));
    }
    if (evt.key === 'Enter') {
      if (state.previousKey !== 'Shift') {
        evt.preventDefault();
        addBlock({
          command: evt.key,
          id: id,
          ref: $contentEditable.current,
        });
        console.log(state);
      }
    }
    if (evt.key === 'Backspace' && !state.html) {
      evt.preventDefault();
      deleteBlock({
        command: evt.key,
        id: id,
        ref: $contentEditable.current,
      });
    }
    if (evt.key !== 'Enter') {
      setState((prev) => ({ ...prev, previousKey: evt.key }));
    }
  };

  return (
    <ContentEditable
      className='Block'
      ref={$contentEditable}
      id={id}
      html={html} //state.html을 넣으면 빈문자열로 초기화가 된다.  page.props.html을 넣어줘야했다.
      tagname={tag}
      onChange={createContent}
      onKeyDown={controllKey}
    />
  );
};

export default EditableBlock;

//////////////////////////////////////////////////////////////////////////////////////////

// import React from 'react';
// import ContentEditable from 'react-contenteditable';

// class EditableBlock extends React.Component {
//   constructor(props) {
//     super(props);
//     // ...
//     this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
//     this.onChangeHandler = this.onChangeHandler.bind(this);
//     this.contentEditable = React.createRef();
//     this.state = {
//       htmlBackup: null,
//       html: '',
//       tag: 'p',
//       previousKey: '',
//     };
//   }

//   componentDidMount() {
//     this.setState({ html: this.props.html, tag: this.props.tag });
//     console.log('state', this.state);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const htmlChanged = prevState.html !== this.state.html; //조건으로 쓸 변수-현재 state의 html값과 페이지에서 props로 넘어온 html값이 다를때
//     const tagChanged = prevState.tag !== this.state.tag; //조건으로 쓸 변수-현재 state의 tag값과 페이지에서 props로 넘어온 tag값이 다를때
//     if (htmlChanged || tagChanged) {
//       this.props.updatePage({
//         // page에서 props로  받아온 update함수

//         //조건이 하나라도 다를때만 재렌더링 //원치않는 렌더링 방지
//         id: this.props.id, //아이디는 페이지의 아이디와 같은 아이디
//         html: this.state.html, // 현재 스테이트의 html
//         tag: this.state.tag, //현재 스테이트의 tag

//         //page에 있는 블럭 아이디를 가져온 후 html과 tag만 변경
//       });
//     }
//   }

//   onChangeHandler(e) {
//     this.setState({ html: e.target.value });
//     console.log('onchange', this.state.html);
//   }

//   onKeyDownHandler(e) {
//     // if (e.key === '/') {
//     //   this.setState({ htmlBackup: this.state.html });
//     // }
//     if (e.key === 'Enter') {
//       if (this.state.previousKey !== 'Shift') {
//         e.preventDefault();
//         console.log('enterstate', this.state);

//         // this.props.addBlock({
//         //   id: this.props.id,
//         //   ref: this.contentEditable.current,
//         // });
//       }
//     }
//     //     if (e.key === 'Backspace' && !this.state.html) {
//     //       e.preventDefault();
//     //       this.props.deleteBlock({
//     //         id: this.props.id,
//     //         ref: this.contentEditable.current,
//     //       });
//     //     }
//     //     this.setState({ previousKey: e.key });
//   }

//   render() {
//     return (
//       <ContentEditable
//         className='Block'
//         innerRef={this.contentEditable}
//         html={this.state.html}
//         tagName={this.state.tag}
//         onChange={this.onChangeHandler}
//         onKeyDown={this.onKeyDownHandler}
//       />
//     );
//   }
// }

// export default EditableBlock;
