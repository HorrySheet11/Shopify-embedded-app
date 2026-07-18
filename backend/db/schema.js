import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('products_table', {
  id: int().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  rating: int().notNull(),
});