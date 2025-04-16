import express from "express";
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/users.routes.js";
import purchaseRoute from "./routes/purchase.routes.js";
import searchRoute from "./routes/search.routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", authRoute);
app.use("/users", userRoute);
app.use("/purchase", purchaseRoute);
app.use("/search", searchRoute);
app.use("/games", gamesRoute);
app.use("/tags", tagsRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
