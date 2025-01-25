import { z, ZodError } from "zod";

export type ValidationErrMsgs = {
  message: string;
  errors: { [key: string]: string };
};

export const workoutSchema = z.object({
  date: z.date(),
  calories: z.number().min(100).max(10000),
  training: z.string(),
  fastingTime: z.number().min(1).max(24),
  coldShower: z.boolean(),
  walk: z.boolean(),
  wakeup: z.number().min(0).max(2400),
  ketoDiet: z.boolean(),
  alcohol: z.boolean(),
  blamage: z.boolean(),
});

export const weightSchema = z.object({
  date: z.date(),
  weight: z.number().min(30).max(200),
});

export const formatZodError = (error: ZodError) => {
  return error.issues.reduce((acc, issue) => {
    acc[issue.path[0]] = issue.message;
    return acc;
  }, {} as Record<string, string>);
};
