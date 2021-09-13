import React from "react";
import ReactDOM from "react-dom";
import {Spring} from "react-spring";
import {PlusCircleFilled} from '@ant-design/icons'
import "./spinning.css";
import { Planet } from 'react-planet';

import styled, { css } from "styled-components";
import { Add } from "@styled-icons/material/Add";

/*
class Spinner extends React.Component {
  state = { turn: false };
  toggle = () => this.setState(state => ({ turn: !state.turn }));

  render() {
    return (
      <div className="App">
        <Spring
          from={{ rotation: "0deg" }}
          to={{ rotation: this.state.turn ? "0" : "45%" }}
        >
          {({ rotation }) => (
            <div
              className="box"
              style={{ transform: `rotate(${rotation})` }}
              onClick={this.toggle}
            >
              {this.state.deg}
            </div>
            <PlusCircleFilled 
                className="btn"
                style={{ transform: `rotate(${rotation})` }}
                onClick={this.toggle}
            />
          )}
        </Spring>
      </div>
    );
  }
}
*/

const buttonHover = css`
  &:hover {
    background-color: #0158AD;
    /*transform: scale(1.03);*/
  }
`;

const ButtonBase = styled.button`
  width: 30px;
  height: 30px;
  color: white;
  border: none;
  background-color: ${p => (p.isOpen ? '#014587' : '#0158AD')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  transform: scale(${p => (p.isOpen ? 1.03 : 1)});

  ${p => !p.isOpen && buttonHover}

  & svg {
    transition: 0.25s ease-in-out;
    transform: rotate(${p => (p.isOpen ? 45 : 0)}deg);
  }
`;

const Button = React.forwardRef(function Button(
  { style, className, isOpen, onClick },
  ref
) {
  return (
    <ButtonBase
      ref={ref}
      style={style}
      className={className}
      isOpen={isOpen}
      onClick={onClick}
    >
      <Add size={28} />
    </ButtonBase>
  );
});





export default function MyPlanet() {  
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return(
    <Planet
    centerContent={<Button
      isOpen={isOpen}
      onClick={toggle}
    />}
    hideOrbit
    autoClose
    orbitRadius={60}

    rotation={105}
    // the bounce direction is minimal visible
    // but on close it seems the button wobbling a bit to the bottom
    bounceDirection="BOTTOM"
>
    <button>test</button>
    <button>test</button>
    <button>test</button>
    <div />
    <div />
    <div />
    <div />
</Planet>
  )
}
