import express from "express";
const app = express();
let port = process.env.port || 5000;
import bodyParser from 'body-parser';

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/hello", (req, res) => {
  res.send("연결 완료");
  console.log("11");
});

app.post("/api/login", (req, res)=> {
    console.log(req.body);
    res.send("로그인 완료");
})

const server = app.listen(port, () => {
  console.log(`server on ${port}`);
});
