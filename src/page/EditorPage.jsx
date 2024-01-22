import React from 'react';

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const initBlock = {
  id: uid(),
  content: '',
  tag: 'p',
};

const EditorPage = () => {
  const [textBlocks, setBlocks] = useState(initBlock);
  return (
    <>
      <div className='page'>
        {textBlocks.map(({ id, tag, content }, idx) => {
          return (
            <div key={idx} id={id}>
              Tag: {tag}, Content: {content}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EditorPage;
