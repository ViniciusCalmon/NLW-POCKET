import {client, db} from "."
import { goalCompletions, goals} from "./schema";
import dayjs from "dayjs";

async function seed() {
    await db.delete(goalCompletions)
    await db.delete(goals)

const result = await db.insert(goals).values([
        { name: "Acordar cedo", desiredWeeklyFrequency: 5},
        { name: "Treinar", desiredWeeklyFrequency: 3},
        { name: "Meditar", desiredWeeklyFrequency: 1},
    ]).returning()

    const starOfWeek = dayjs().startOf("week")

    await db.insert(goalCompletions).values([
        { goalId:result[0].id, createdAt: starOfWeek.toDate() },
        { goalId:result[1].id, createdAt: starOfWeek.toDate() },
    ])
}


seed().finally(() => {
    client.end()
})