import styled from "styled-components";

const containerWidth = "150px";
const terminalWidth = "50px";

export const BatteryContainer = styled.div<{
  $totalCharge: number;
}>`
  position: relative;
  width: ${containerWidth};
  min-width: ${containerWidth};
  height: 250px;
  border: 2px solid black;
  background-color: rgba(255, 255, 255, 1);
  background-image: linear-gradient(
    to top,
    green ${(props) => `${props.$totalCharge}%`},
    rgba(0, 0, 0, 0) 0%
  );
`;

export const BatteryTerminal = styled.div`
  position: absolute;
  width: ${terminalWidth};
  height: 25px;
  background-color: rgba(255, 255, 255, 1);
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
  z-index: -1;
  transform: translate(100%, -50%);
`;

export const ChargeLevel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: black;
  font-weight: bold;
`;
