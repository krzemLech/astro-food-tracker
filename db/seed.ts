import { db, Workouts } from "astro:db";
import { parseDateToDayStart } from "@/lib/dates";

// Get dates for the last three days
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

// https://astro.build/db/seed
// add alcohol and blamage
export default async function seed() {
  await db.insert(Workouts).values([
    {
      date: parseDateToDayStart(today),
      calories: 2100,
      training: "Upper body workout + 5km run",
      fastingTime: 16,
      coldShower: true,
      walk: true,
      wakeup: 600,
      ketoDiet: true,
      alcohol: false,
      blamage: false,
      createdAt: today,
    },
    {
      date: parseDateToDayStart(yesterday),
      calories: 1950,
      training: "Lower body workout",
      fastingTime: 14,
      coldShower: true,
      walk: true,
      wakeup: 630,
      ketoDiet: false,
      alcohol: true,
      blamage: false,
      createdAt: yesterday,
    },
    {
      date: parseDateToDayStart(twoDaysAgo),
      calories: 2200,
      training: "HIIT session",
      fastingTime: 12,
      coldShower: false,
      walk: false,
      wakeup: 700,
      ketoDiet: true,
      alcohol: false,
      blamage: true,
      createdAt: twoDaysAgo,
    },
  ]);
}
