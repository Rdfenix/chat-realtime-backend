import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const username = process.env.MONGO_USERNAME;
const password = encodeURIComponent(`${process.env.MONGO_PASSWORD}`);
const cluster = process.env.MONGO_CLUSTER;
const DATABASE_URL = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;

mongoose.connect(DATABASE_URL, { connectTimeoutMS: 1000 });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => console.log("Connected"));

export default db;
