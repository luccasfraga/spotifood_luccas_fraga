import styled from 'styled-components';
import { metrics } from '../../assets/styles/index';

export const Container = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 0 13px 0 rgba(153, 153, 153, 0.1);

  h1 {
    font-size: 30px;
    line-height: 30px;
    margin-bottom: 30px;
    color: #fff;

    @media (min-width: ${metrics.screenSm}) {
      font-size: 118px;
      line-height: 110px;
    }

    span {
      color: #c5f1d5;
      font-size: 27px;
      line-height: 29px;

      @media (min-width: ${metrics.screenSm}) {
        font-size: 110px;
        line-height: 107px;
      }
    }
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 0;
`;

export const BoxFilter = styled.div`
  display: flex;
  width: 100%;
  background-color: #fff;
  padding: 30px;
  margin: 0 59px;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 15px;

  > div {
    width: 100%;
    margin-bottom: 15px;

    @media (min-width: ${metrics.screenSm}) {
      width: 30%;
    }
  }
`;

export const ItemList = styled.li`
  display: flex;
  flex-basis: 100%;
  height: 224px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  margin: 0 0 10px;
  cursor: pointer;
  position: relative;

  @media (min-width: ${metrics.screenSm}) {
    margin: 0;
    flex-basis: 20%;
  }

  > a {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: flex-end;
    text-decoration: none;

    > div {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: flex-start;
      background: rgba(0, 0, 0, 0.55);
      height: 50px;
      padding: 0 15px;
      span {
        font-weight: bold;
        display: block;
        color: #fff;

        em {
          display: block;
          font-style: normal;
          font-size: 11px;
          font-weight: 100;
        }
      }
    }
  }
`;
