import { useState } from "react";
import { BatteryResponseBody } from "lib";

export function useFetchBattery() {
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
        // TODO show some user feedback
        const responseText = await response.text();

        console.error("responseText", responseText);

        return;
      }

      const json = await response.json();
      setResponseBody(json);
    } catch (error) {
      // TODO show user feedback
      console.error("Something unexpected occurred", error);
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
