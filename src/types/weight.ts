export interface Weight {
  id: number;
  date: Date;
  weight: number;
  createdAt: Date;
}

export type WeightInput = Omit<Weight, "id" | "createdAt">;
