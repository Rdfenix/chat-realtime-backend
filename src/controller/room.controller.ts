import RoomModel from "../models/room";
import { Request, Response } from "express";
import websocket from "../websocket";

const RoomList = async () => await RoomModel.find();
const findRoom = async (id: any) => await RoomModel.findById(id);
const removeOneRoom = async (id: any) => await RoomModel.findByIdAndRemove(id);

const createRoom = async (req: Request, res: Response) => {
  if (!req.body.title || !req.body.username) {
    res.status(400).json({ message: "Content cant be empty" });
  }

  const { title, username } = req.body;

  const room = new RoomModel({
    title,
    username,
  });

  try {
    const result = await room.save();
    websocket.sendRoomMessage("HALL", result, "ADD");
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Some error occurred while creating room",
    });
  }
};

const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await RoomList();
    res.status(200).json({ rooms, messages: "Found" });
  } catch (error: any) {
    res.status(404).json({ rooms: [], message: error.message });
  }
};

const getRoom = async (req: Request, res: Response) => {
  try {
    const id = req.query._id;
    const room = await findRoom(id);
    res.status(200).json({ rooms: [room], messages: "Found" });
  } catch (error: any) {
    res.status(404).json({ rooms: [], message: error.message });
  }
};

const deleteRoom = async (req: Request, res: Response) => {
  try {
    const _id = req.query._id;
    const data = await removeOneRoom(_id);
    if (!data) {
      res.status(404).send({
        rooms: [],
        message: `room not found.`,
      });
    } else {
      websocket.sendRoomMessage("HALL", data, "DELETE");
      res.status(200).send({
        rooms: [],
        message: "room deleted successfully!",
      });
    }
  } catch (error: any) {
    res.status(500).json({ rooms: [], message: error.message });
  }
};

export default { createRoom, getAllRooms, deleteRoom, getRoom };
