import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    background-image: url('https://campaigns.scdn.co/images/premium_dancer_prod.png');
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background-repeat: no-repeat;
    background-position: 100% 100%;
  }

  nav {
    display: flex;
    height: 90px;
    align-items: center;
    padding: 0 30px;

    img {
      width: 150px;
    }
  }

  > div {
    display: flex;
    padding: 0 30px;
    height: calc(100vh - 90px);
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    h1 {
      color: #fff;
      font-size: 82px;
      line-height: 70px;
      font-weight: bold;
      margin-bottom: 40px;
      position: relative;
    }

    a {
      background-color: #1db954;
      padding: 17px 52px;
      font-size: 16px;
      text-decoration: none;
      color: #fff;
      position: relative;
      z-index: 1;
      border-radius: 7px;
      cursor: pointer;
    }
  }
`;
