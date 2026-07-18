export async function getRating(req, res) {
  res.json({ rating: 5 });
}import {drizzle} from "drizzle-orm/mysql2";

const db = drizzle(process.env.DATABASE_URL);
