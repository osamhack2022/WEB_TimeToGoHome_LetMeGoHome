import express from "express";
const app = express();
let port = process.env.port || 5000;
import bodyParser from "body-parser";
import apiRouter from "./routes/api.js";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/api", apiRouter);

const server = app.listen(port, () => {
  console.log(`server on ${port}`);
});
