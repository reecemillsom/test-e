export interface BatteryResponseBody {
  id: number;
  name: string;
  totalCapacity: number;
  charge: number;
  emptyCount: number;
  status: "Empty" | "Charged" | "Full";
}
