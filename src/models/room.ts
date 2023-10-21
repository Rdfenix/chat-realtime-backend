import mongoose from "mongoose";

//model simplified to just studying how function the schema
const schema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
    unique: true,
  },
});

const Room = mongoose.model("Room", schema);

export default Room;
