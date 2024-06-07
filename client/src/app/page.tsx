"use client";

import { useEffect } from "react";
import { useFetchBattery } from "@/hooks/useFetchBattery";
import { Battery } from "@/components/Battery/Battery";
import {
  BatteryContainer,
  BatteryEditInput,
  BatteryInfo,
  BatteryMeta,
} from "./styles";
import styles from "./page.module.css";

export default function Home() {
  const {
    responseBody: battery,
    fetchBattery,
    chargeBattery,
    dischargeBattery,
  } = useFetchBattery();

  useEffect(() => {
    fetchBattery();
  }, []);

  console.log("battery", battery);

  return (
    <main className={styles.main}>
      {battery && (
        <BatteryContainer style={{ display: "flex", flexDirection: "row" }}>
          <Battery capacity={battery.totalCapacity} charge={battery.charge} />
          <BatteryInfo>
            <BatteryMeta>
              <b>Status:</b> <span>{battery.status}</span>
            </BatteryMeta>
            <BatteryMeta>
              <b>Charge:</b>
              <BatteryEditInput
                id="number"
                type="number"
                step={0.1}
                min={0.1}
                style={{ width: "50%" }}
              />
            </BatteryMeta>
            <BatteryMeta>
              <b>Discharge:</b>
              <BatteryEditInput
                id="number"
                type="number"
                step={0.1}
                min={0.1}
                style={{ width: "50%" }}
              />
            </BatteryMeta>
          </BatteryInfo>
        </BatteryContainer>
      )}
    </main>
  );
}
