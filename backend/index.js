import express from "express";
import "dotenv/config";
import cors from "cors";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { productsTable } from "./src/db/schema.js";
import routes from "./src/routers/indexRouter.js";

const app = express();
const db = drizzle(process.env.DATABASE_URL);

app.use(express.json());
app.use(
	cors({
		origin: ["https://admin.shopify.com/"],
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE"],
	}),
);

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "My Horry API",
			version: "1.0.0",
			description: "API documentation using swagger-jsdoc",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["src/routers/indexRouter.js", "src/routers/rateRouter.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

async function addData() {
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

app.use("/", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
