import React, { useCallback, useEffect, useRef, useState } from 'react';
import EditableBlock from '../components/EditableBlock';
import setFocusToEnd from '../utill/setFocusToEnd';

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}; //동적으로  아이디를 만들어주는 함수

const initBlock = {
  id: uid(),
  html: '',
  tag: 'p',
};
const EditorPage = () => {
  const [blocks, setBlocks] = useState([initBlock]);
  const [currentIdx, setCurrentIdx] = useState();
  const [command, setCommand] = useState();

  const nextFocusIdx = useCallback(
    (prevBlockIdx) => {
      //useCallback으로 계산한 값을 기억할수 있고 파라미터를 받을 수 있다.

      const newBlockId = blocks[prevBlockIdx + 1].id;

      const newBlock = document.querySelector(`#${newBlockId}`);

      if (newBlock) {
        newBlock.focus();
      }
    },
    [blocks],
  );

  const prevFocusIdx = useCallback(
    (prevBlockIdx) => {
      const prevBlockId = blocks[prevBlockIdx - 1].id;

      const prevBlock = document.querySelector(`#${prevBlockId}`);

      if (prevBlock) {
        setFocusToEnd(prevBlock); //문단의 마지막 위치에 포커스 하는 함수
      }
    },
    [blocks],
  );

  useEffect(() => {
    if (command === 'Enter') {
      nextFocusIdx(currentIdx); //첫 렌더링 시점엔 currentIdx가 undefined이기 때문에 if문으로 조건 추가
    } else if (command === 'Backspace') {
      if (currentIdx !== 0) prevFocusIdx(currentIdx);
    }
  }, [blocks.length, command, currentIdx]);

  const updatePageHandler = (updatedBlock) => {
    const idx = blocks.map((b) => b.id).indexOf(updatedBlock.id);
    // const idx = updatedBlock.idx; //page textBlocks의 인덱스와 EditableBlock의 인덱스를 맞추는 코드//하나의 블럭에도 여러개의 div태그와 idx가 있기때문에 헷갈림
    const newTextBlocks = [...blocks];
    newTextBlocks[idx].html = updatedBlock.html;
    newTextBlocks[idx].tag = updatedBlock.tag; //인덱스가 맞는 block객체를 ...연산자로 복사한 뒤 데이터변경
    setBlocks(newTextBlocks);
    console.log('page', blocks);
  };

  const addBlockHandler = (currentBlock) => {
    const newBlock = { id: uid(), html: '', tag: 'p' };
    const idx = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(idx + 1, 0, newBlock);
    //자바스크립트의 splice() 메서드는 배열 객체에 사용할 수 있는 내장 메서드입니다. 이는 기존 요소를 삭제하거나 교체하여 배열의 내용을 변경하며, 제거된 요소가 담긴 별도의 배열을 새로 반환합니다.
    setCommand(currentBlock.command); //editblock에서 일어난 key값을 스테이트의 저장
    setCurrentIdx(idx); //이벤트가 일어난 태그 인데스 스테이트의 저장
    setBlocks(updatedBlocks); //set함수는 두번째 콜백인자를 받지 않는다.//레퍼런스처럼 focus불가능
    // $contentEdit.current[focusIdx]?.focus();
  };

  const deleteBlockHandler = (currentBlock) => {
    const idx = blocks.map((b) => b.id).indexOf(currentBlock.id);
    setCommand(currentBlock.command);
    setCurrentIdx(idx);
    if (blocks.length > 1) {
      //마지막인덱스에서 삭제취소하는  조건
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(idx, 1);
      setBlocks(updatedBlocks);
    }
  };

  return (
    <>
      <div className='page'>
        {blocks.map(({ id, tag, html }) => {
          return (
            <EditableBlock
              key={id}
              id={id}
              tag={tag}
              html={html}
              updatePage={updatePageHandler}
              addBlock={addBlockHandler}
              deleteBlock={deleteBlockHandler}
            />
          );
        })}
      </div>
    </>
  );
};

export default EditorPage;

// Imports; ////////////////////////////////////////////////////////////////////////////////////////////

// const uid = () => {
//   return Date.now().toString(36) + Math.random().toString(36).substr(2);
// };
// const initialBlock = { id: uid(), html: '', tag: 'p' };

// class EditablePage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.updatePageHandler = this.updatePageHandler.bind(this);
//     this.addBlockHandler = this.addBlockHandler.bind(this);
//     this.deleteBlockHandler = this.deleteBlockHandler.bind(this);
//     this.state = { blocks: [initialBlock] };
//   }

//   updatePageHandler(updatedBlock) {
//     const blocks = this.state.blocks;
//     const index = blocks.map((b) => b.id).indexOf(updatedBlock.id); //맵으로 여러블럭의 아이디 배열을 리턴한 후 updateblock의 아이디를 사용해서 index를 찾는 코드
//     //페이지의 스테이트의 있는 block id와 update하려는 block의 id가 같은 위치의 인덱스를 구함
//     const updatedBlocks = [...blocks];
//     updatedBlocks[index] = {
//       ...updatedBlocks[index],
//       tag: updatedBlock.tag,
//       html: updatedBlock.html,
//     };
//     this.setState({ blocks: updatedBlocks });
//     console.log('0p', this.state.blocks);
//   }

//   addBlockHandler(currentBlock) {
//     console.log('시작');
//     const newBlock = { id: uid(), html: '', tag: 'p' };
//     const blocks = this.state.blocks;
//     const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
//     const updatedBlocks = [...blocks];
//     updatedBlocks.splice(index + 1, 0, newBlock);
//     this.setState({ blocks: updatedBlocks }, () => {
//       currentBlock.ref.nextElementSibling.focus();
//     });

//     console.log('1p', this.state.blocks);
//   }

//   deleteBlockHandler(currentBlock) {
//     const previousBlock = currentBlock.ref.previousElementSibling;
//     if (previousBlock) {
//       const blocks = this.state.blocks;
//       const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
//       const updatedBlocks = [...blocks];
//       updatedBlocks.splice(index, 1);
//       this.setState({ blocks: updatedBlocks }, () => {
//         setCaretToEnd(previousBlock);
//         previousBlock.focus();
//       });
//     }
//   }

//   render() {
//     return (
//       <div className='Page'>
//         {this.state.blocks.map((block, key) => {
//           return (
//             <EditableBlock
//               idx={key}
//               key={key}
//               id={block.id}
//               tag={block.tag}
//               html={block.html}
//               updatePage={this.updatePageHandler}
//               addBlock={this.addBlockHandler}
//               deleteBlock={this.deleteBlockHandler}
//             />
//           );
//         })}
//       </div>
//     );
//   }
// }

// export default EditablePage;
