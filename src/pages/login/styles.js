import styled from 'styled-components';
import { metrics } from '../../assets/styles/index';

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
    background-size: 86%;
    @media (min-width: ${metrics.screenSm}) {
      background-size: unset;
    }
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
    align-items: flex-start;
    justify-content: space-evenly;

    @media (min-width: ${metrics.screenSm}) {
      justify-content: center;
    }

    h1 {
      color: #fff;
      font-size: 38px;
      line-height: 41px;
      font-weight: bold;
      margin-bottom: 40px;
      position: relative;
      @media (min-width: ${metrics.screenSm}) {
        font-size: 82px;
        line-height: 70px;
      }
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
      width: 233px;
      transition: 0.2s ease-in-out;
      text-align: center;
      height: 52px;
      &:hover,
      &:focus {
        transition: 0.2s ease-in-out;
        background-color: #353535;
      }

      div {
        color: #fff;
      }
    }
  }
`;
