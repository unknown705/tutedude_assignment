import dotenv from "dotenv";
import connectDb from "./config/dbConfig";
import app from "./app";

dotenv.config();

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
