import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "./db/index";
import router from "./routes";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

app.listen(3333, () => console.log("server running on port 3333"));
