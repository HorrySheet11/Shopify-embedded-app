import express from "express";
import 'dotenv/config';
import drizzle from "drizzle-orm/mysql2";

const app = express();
const db = drizzle(process.env.DATABASE_URL);

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});