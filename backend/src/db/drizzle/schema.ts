import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, varchar } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const productsTable = mysqlTable("products_table", {
	id: int().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	rating: int().notNull(),
});
