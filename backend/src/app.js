import express from "express";
import cors from "cors";
import routes from "./routes/search.route.js";
import crawlRoutes from "./routes/crawl.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/api", crawlRoutes);

export default app;