import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: varchar('email').notNull(),
    credits: integer('credits').default(3)
})

export const aiGeneratedImages = pgTable("ai_generated_images", {
  id: serial("id").primaryKey(),
  roomType: varchar("room_type").notNull(),
  orgImage: varchar("org_image").notNull(),
  generatedImage: varchar("generated_image").notNull(),
  userEmail: varchar("user_email").notNull(),
});
