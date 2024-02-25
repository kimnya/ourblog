import styled from 'styled-components';

export const EditBoxStyle = styled.div`
  position: absolute;
  left: ${(props) => {
    if (props.type === 'image') {
      return '180px';
    }
  }};
  top: ${(props) => {
    if (props.type === 'image') {
      return '30px';
    }
  }};

  > input {
    width: 200px;
    &:nth-child(2) {
      left: -450px;
    }
  }
  label {
    display: none;
  }
`;

export const MemberBoxStyle = styled.tr`
  font-size: 18px;
`;

export const MemberListStyle = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 1237px;
  font-size: 24px;

  tr {
    &:last-child {
      font-size: 18px;
    }
  }
`;
