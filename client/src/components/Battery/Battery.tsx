import { FC } from "react";
import * as S from "./styles";

interface Props {
  capacity: number;
  charge: number;
}

export const Battery: FC<Props> = ({ capacity, charge }) => {
  const totalCharge = Math.round((capacity / charge) * 100);

  return (
    <S.BatteryContainer totalCharge={totalCharge}>
      <S.BatteryTerminal />
      <S.ChargeLevel>
        {totalCharge}% / {charge}kW
      </S.ChargeLevel>
    </S.BatteryContainer>
  );
};
