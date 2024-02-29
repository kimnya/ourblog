import styled from 'styled-components';
import { palette } from '../../styles/palette';

export const ArticleListStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: space-between;
  width: 1237px;
  height: 710px;
`;

export const ArticleListBoxStyle = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 282px;
  height: 339px;
  background-color: ${({ theme }) => theme.articleColor};
  border: 1px solid ${palette.mainGreen};

  > .articlePhotoBox {
    width: 282px;
    height: 154px;
    overflow: hidden;
    text-overflow: ellipsis;

    > img {
      display: inline-block;
      width: 99%;
      height: 100%;
    }
    > p {
      display: flex;

      align-items: center;
      width: 100%;
      height: 100%;
      color: #aaa;
    }
  }
  > .articleTxtBox {
    overflow: hidden;
    text-overflow: ellipsis;
    > p {
      height: 77px;
      color: #aaa;
    }
  }
  > .articleEctBox {
    display: flex;
    justify-content: space-between;
    .writer {
      margin-right: 10px;
    }
  }
`;

export const BlogNameTag = styled.p`
  position: absolute;
  left: 0;
  top: 0;
  color: ${palette.mainGreen};
  font-weight: bold;
  font-size: 22px;
`;

export const UserArticleListStyle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: space-between;
  width: 1237px;
  height: 710px;

  > .articlePhotoBox {
    width: 282px;
    height: 154px;

    > img {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    > p {
      display: flex;

      align-items: center;
      width: 100%;
      height: 100%;
      color: #aaa;
    }
  }
  > .articleTxtBox {
    > p {
      height: 77px;
      color: #aaa;
    }
  }
  > .articleEctBox {
    display: flex;
    justify-content: space-between;
  }
`;
