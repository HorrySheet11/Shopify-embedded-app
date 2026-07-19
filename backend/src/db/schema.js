import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const productsTable = mysqlTable('products_table', {
  id: int().primaryKey().autoincrement(),
  productId: int().notNull(),
  name: varchar({ length: 255 }).notNull(),
  rating: int().notNull(),
});
