import React from 'react';
import styled from 'styled-components';

const Loader: React.FC = () => (
  <StyledLoader className="lds-ring">
    <div />
    <div />
    <div />
    <div />
  </StyledLoader>
);

const StyledLoader = styled.div`
  display: inline-block;
  position: absolute;
  right: -40px;
  width: 32px;
  height: 32px;
  top: 50%;
  padding: 0;
  transform: translate(0, -50%);
  border: none;
  outline: none;
  background: transparent;
  > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    margin: 6px;
    border: 2px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
