import RoomModel from "../models/room";
import { Request, Response } from "express";

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
    res.status(200).json(rooms);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

const deleteRoom = async (req: Request, res: Response) => {
  try {
    const data = await removeOneRoom(req.body._id);
    if (!data) {
      res.status(404).send({
        message: `User not found.`,
      });
    } else {
      res.status(200).send({
        message: "User deleted successfully!",
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default { createRoom, getAllRooms, deleteRoom };
