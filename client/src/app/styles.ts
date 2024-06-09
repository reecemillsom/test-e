import styled from "styled-components";

export const BatteryInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-left: 10px;
`;

export const BatteryMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const BatteryContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const BatteryEditContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const BatteryEditInput = styled.input`
  background: ghostwhite;
  border: 1px solid lightgray;
  color: black;
  margin-right: 10px;

  width: 50%;

  @media (max-width: 600px) {
    width: 40%;
  }
`;
