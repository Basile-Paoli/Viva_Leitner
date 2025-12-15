import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const cardsTable = pgTable("cards", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  tag: text("tag"),
  createdAt: timestamp("created_at").notNull(),
});

export const reviewsTable = pgTable("reviews", {
  cardId: serial("card_id")
    .notNull()
    .references(() => cardsTable.id),
  reviewDate: timestamp("review_date").notNull(),
  success: boolean("success").notNull(),
});
