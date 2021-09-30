import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connDb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errors.js";


dotenv.config();

const app = express();

connDb();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);


app.use(notFound)


app.use(errorHandler);



const PORT = process.env.PORT || 5500;
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));