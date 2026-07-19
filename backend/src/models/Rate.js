import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { productsTable } from "../db/schema.js";

const db = drizzle(process.env.DATABASE_URL);

export async function getItemRating(id) {
	const productId = id;
	return await db
		.select({
			productId: productsTable.productId,
			averageRating: sql`AVG(${productsTable.rating})`,
		})
		.from(productsTable)
		.groupBy(productsTable.productId)
		.where(eq(productsTable.productId, productId));
}

export async function postItemRating(data) {
  return await db.insert(productsTable).values(data);
}
