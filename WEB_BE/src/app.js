import express from "express";
const app = express();
let port = process.env.port || 5000;
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import apiRouter from "./routes/api.js";

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://timetogohome.kro.kr"
        : "*",
    credentials: false,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api", apiRouter);

if (process.env.NODE_ENV !== "production") {
  const swaggerJsdoc = await import("swagger-jsdoc");
  const swaggerUi = await import("swagger-ui-express");
  const swaggerOptions = await import("./swagger.js");
  const specs = swaggerJsdoc.default(swaggerOptions.default);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
}

const server = app.listen(port, () => {
  console.log(`server on ${port}`);
});
