"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import { useFetchBattery } from "@/hooks/useFetchBattery";
import { Battery } from "@/components/Battery/Battery";

export default function Home() {
  const { responseBody: battery, fetchBattery } = useFetchBattery();

  useEffect(() => {
    fetchBattery();
  }, []);

  console.log("battery", battery);

  return (
    <main className={styles.main}>
      {battery && (
        <Battery capacity={battery.totalCapacity} charge={battery.charge} />
      )}
    </main>
  );
}
