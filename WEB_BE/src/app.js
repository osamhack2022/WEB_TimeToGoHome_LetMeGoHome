import express from "express";
const app = express();
let port = process.env.port || 5000;
import bodyParser from "body-parser";
import morgan from "morgan";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swagger.js";
const specs = swaggerJsdoc(swaggerOptions);

import apiRouter from "./routes/router.js";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api", apiRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

const server = app.listen(port, () => {
  console.log(`server on ${port}`);
});
