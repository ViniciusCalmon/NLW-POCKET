import { db } from "../db";
import { goals } from "../db/schema";

interface CreateGoalRequest {
  name: string;
  desiredWeeklyFrequency: number;
}

export async function createGoal({
  name,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      name,
      desiredWeeklyFrequency,
    })
    .returning();

  const goal = result[0];

  return {
    goal,
  };
}
