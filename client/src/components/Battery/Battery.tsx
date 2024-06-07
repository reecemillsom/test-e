import { FC } from "react";
import * as S from "./styles";

interface Props {
  capacity: number;
  charge: number;
}

export const Battery: FC<Props> = ({ capacity, charge }) => {
  const totalCharge = (capacity / charge) * 100;

  return (
    <S.BatteryContainer totalCharge={totalCharge}>
      <S.BatteryTerminal />
      <S.ChargeLevel>{totalCharge}%</S.ChargeLevel>
    </S.BatteryContainer>
  );
};
