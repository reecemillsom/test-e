import { FC, useState } from "react";

// TODO add specific typing for Battery, reason I haven't as on the BE we require it from prisma, that won't work on the client.
interface Props {
  capacity: number;
  charge: number;
  status: string;
}

export const Battery: FC<Props> = ({ capacity, charge, status }) => {
  // const battery

  return <div>hi</div>;
};
