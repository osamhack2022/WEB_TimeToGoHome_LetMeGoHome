import express from "express";
const app = express();
let port = process.env.port || 5000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const server = app.listen(port, () => {
  console.log(`server on ${port}`);
});
