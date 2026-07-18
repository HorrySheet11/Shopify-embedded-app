import express from "express";
import 'dotenv/config';
import {eq} from "drizzle-orm";
import {drizzle} from "drizzle-orm/mysql2";
import { productsTable } from './src/db/schema.js';
import routes from './src/routers/index.js';

const app = express();
const db = drizzle(process.env.DATABASE_URL);

app.use(express.json());

async function addData(){
  // const rating = {
  //   productId: 1,
  //   name: "Product 1",
  //   rating: 5,
  // };

  // await db.insert(productsTable).values(rating);
  // const rating2 = {
  //   productId: 2,
  //   name: "Product 2",
  //   rating: 4,
  // };
  // await db.insert(productsTable).values(rating2);
  
  const ratings = await db.select().from(productsTable);
  // .where(eq(productsTable.rating, 5));
  console.log(`product ratings: ${JSON.stringify(ratings)}`);
}

addData();

app.use('/',routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});