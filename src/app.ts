import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { readdirSync } from "fs";
import { join } from "path";
import { exception } from "./utils/exception";
import { notFound } from "./utils/notFound";
import CronService from "./services/CronService";

const app = express();

app.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]);

app.use(cors());
app.use(json());

const routes = readdirSync(join(__dirname, "router"));

for (const route of routes) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.use("/api", require(join(__dirname, "router", route)).default);
}

app.use(exception);
app.use(notFound);

CronService.setUpdateStatusCron();

export default app;
