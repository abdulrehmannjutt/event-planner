import { app } from "./app.js";
import "dotenv/config";
import connectDB from "./db/index.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {});
    console.log(`server is running at: ${process.env.PORT || 8000}`);
  })
  .catch((err) => {
    console.error("error while connecting to db! ", err);
  });