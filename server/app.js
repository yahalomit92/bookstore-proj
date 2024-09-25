import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import routes from "./routers/index.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", routes);
export default app;
