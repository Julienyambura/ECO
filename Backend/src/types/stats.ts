export interface MonthlyStats {
  month: string;
  amount: number;
}

export interface RecyclingStats {
  totalLocations: number;
  totalGlassRecycled: number;
  co2Saved: number;
  energySaved: number;
  monthlyStats: MonthlyStats[];
}
