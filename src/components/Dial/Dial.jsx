import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components';

import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';

// interface DialProps {
//   children?: React.ReactNode;
//   disabled?: boolean;
//   size?: number;
//   value: number;
// }

const Dial = ({children, disabled, size = 256, value}) => {
  const {color} = useContext(ThemeContext);

  return (
    <StyledDial size={size}>
      <StyledOuter>
        <CircularProgressbar
          value={value}
          styles={buildStyles({
            strokeLinecap: 'round',
            pathColor: !disabled ? '#D7325D' : color.grey[400],
            pathTransitionDuration: 1,
          })}
        />
      </StyledOuter>
      <StyledInner size={size}>{children}</StyledInner>
    </StyledDial>
  );
};

// interface StyledInnerProps {
//   size: number;
// }

const StyledDial = styled.div`
  padding: 24px;
  position: relative;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

const StyledInner = styled.div`
  align-items: center;
  background-color: #271c20;
  border-radius: ${(props) => props.size}px;
  display: flex;
  justify-content: center;
  position: relative;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

const StyledOuter = styled.div`
  background-color: #000;
  border-radius: 10000px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default Dial;
