import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),

  email: text().notNull().unique(),
  password: text().notNull(),
});

export type InsertUserType = typeof usersTable.$inferInsert;
export type SelectUserType = typeof usersTable.$inferSelect;

export const documentsTable = sqliteTable("documents_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  initialContent: text(),
  ownerId: int().notNull().references(() => usersTable.id),
  roomId: int(),
  organizationId: int(),
});

export type InsertDocumentType = typeof documentsTable.$inferInsert;
export type SelectDocumentType = typeof documentsTable.$inferSelect;



