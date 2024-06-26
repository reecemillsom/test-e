"use client";

import { KeyboardEvent, useEffect } from "react";
import { message } from "antd";
import { useFetchBattery } from "@/hooks/useFetchBattery";
import { Battery } from "@/components/Battery/Battery";
import {
  BatteryContainer,
  BatteryEditContainer,
  BatteryEditInput,
  BatteryInfo,
  BatteryMeta,
} from "./styles";
import styles from "./page.module.css";

type EditType = "charge" | "discharge";

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();

  const {
    responseBody: battery,
    fetchBattery,
    chargeBattery,
    dischargeBattery,
  } = useFetchBattery(messageApi);

  useEffect(() => {
    fetchBattery();
  }, [fetchBattery]);

  const handlerSubmit = (e: KeyboardEvent, editType: EditType) => {
    const isEnterKey = e.key === "Enter";
    const targetValue: number = Number((e.target as HTMLInputElement).value);

    if (isEnterKey) {
      if (targetValue > 0) {
        editType === "charge"
          ? chargeBattery(targetValue)
          : dischargeBattery(targetValue);
      } else {
        messageApi.error("Input value should be greater than 0");
      }
    }
  };

  return (
    <>
      {contextHolder}
      <main className={styles.main}>
        {battery && (
          <BatteryContainer style={{ display: "flex", flexDirection: "row" }}>
            <Battery capacity={battery.totalCapacity} charge={battery.charge} />
            <BatteryInfo>
              <BatteryMeta>
                <b>Status:</b> <span>{battery.status}</span>
              </BatteryMeta>
              <BatteryMeta>
                <b>Current Charge:</b>
                <span>{battery.charge}kW</span>
              </BatteryMeta>
              <BatteryMeta>
                <b>Charge:</b>
                <BatteryEditContainer>
                  <BatteryEditInput
                    type="number"
                    step={0.1}
                    min={0.1}
                    onKeyDown={(e) => handlerSubmit(e, "charge")}
                  />
                  <span>kW</span>
                </BatteryEditContainer>
              </BatteryMeta>
              <BatteryMeta>
                <b>Discharge:</b>
                <BatteryEditContainer>
                  <BatteryEditInput
                    type="number"
                    step={0.1}
                    min={0.1}
                    onKeyDown={(e) => handlerSubmit(e, "discharge")}
                  />
                  <span>kW</span>
                </BatteryEditContainer>
              </BatteryMeta>
            </BatteryInfo>
          </BatteryContainer>
        )}
      </main>
    </>
  );
}
