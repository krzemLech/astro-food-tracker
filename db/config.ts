import { defineDb, defineTable, column } from "astro:db";

const Workouts = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    date: column.date(),
    calories: column.number(),
    training: column.text(),
    fastingTime: column.number(),
    wakeup: column.number(),
    coldShower: column.boolean(),
    walk: column.boolean(),
    ketoDiet: column.boolean(),
    alcohol: column.boolean(),
    blamage: column.boolean(),
    createdAt: column.date({ default: new Date() }),
  },
});

const Weights = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    date: column.date(),
    weight: column.number(),
    createdAt: column.date({ default: new Date() }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Workouts, Weights },
});
