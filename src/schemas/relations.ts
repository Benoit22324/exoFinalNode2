import { relations } from "drizzle-orm";
import { users, quizs, comments, parts, runs } from "./";

export const userRelations = relations(users, ({ many }) => ({
    quizs: many(quizs),

    comments: many(comments),

    runs: many(runs)
}))

export const quizRelations = relations(quizs, ({ one, many }) => ({
    user: one(users, {
        fields: [quizs.authorId],
        references: [users.id]
    }),

    parts: many(parts),

    comments: many(comments),

    runs: many(runs)
}))

export const commentRelations = relations(comments, ({ one }) => ({
    user: one(users, {
        fields: [comments.authorId],
        references: [users.id]
    }),

    quiz: one(quizs, {
        fields: [comments.quizId],
        references: [quizs.id]
    })
}))

export const partRelations = relations(parts, ({ one }) => ({
    quiz: one(quizs, {
        fields: [parts.quizId],
        references: [quizs.id]
    })
}))

export const runRelations = relations(runs, ({ one }) => ({
    user: one(users, {
        fields: [runs.userId],
        references: [users.id]
    }),

    quiz: one(quizs, {
        fields: [runs.quizId],
        references: [quizs.id]
    })
}))