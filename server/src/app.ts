import express from "express";
import cors from "cors";
import appRoutes from "./routes/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", appRoutes);

export default app;
