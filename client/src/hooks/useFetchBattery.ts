import { useState } from "react";
import { MessageInstance } from "antd/es/message/interface";
import { BatteryResponseBody } from "lib";

export function useFetchBattery(messageApi: MessageInstance) {
  const [responseBody, setResponseBody] = useState<null | BatteryResponseBody>(
    null,
  );

  const genericFetch = async (
    url: string,
    method: "GET" | "PATCH",
    data?: string,
  ) => {
    try {
      const response = await fetch(url, {
        method,
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const responseText = await response.text();

        messageApi.error(JSON.parse(responseText).message);

        return;
      }

      const json = await response.json();
      setResponseBody(json);
    } catch (error: unknown) {
      messageApi.error("Something unexpected happened");
    }
  };

  const fetchBattery = async () => {
    await genericFetch(`${process.env.NEXT_PUBLIC_API_URL}/1`, "GET"); // TODO if we had more batteries to interact with them obviously this wouldn't be hardcoded.
  };

  const chargeBattery = async (charge: number) => {
    await genericFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/1/charge`,
      "PATCH",
      JSON.stringify({
        charge,
      }),
    );
  };

  const dischargeBattery = async (discharge: number) => {
    await genericFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/1/discharge`,
      "PATCH",
      JSON.stringify({
        discharge,
      }),
    );
  };

  return { chargeBattery, dischargeBattery, fetchBattery, responseBody };
}
