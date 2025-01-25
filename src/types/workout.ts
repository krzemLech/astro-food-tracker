export interface Workout {
  id: number;
  date: Date;
  calories: number;
  training: string;
  fastingTime: number;
  coldShower: boolean;
  walk: boolean;
  wakeup: number;
  ketoDiet: boolean;
  alcohol: boolean;
  blamage: boolean;
  createdAt: Date;
}

export type WorkoutInput = Omit<Workout, "id" | "createdAt">;
