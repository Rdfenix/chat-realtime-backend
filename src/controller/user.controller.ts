import UserModel from "../models/user";
import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
  if (!req.body.name || !req.body.username || !req.body.password) {
    res.status(400).json({ message: "Content cant be empty" });
  }

  const { name, password, username } = req.body;

  const user = new UserModel({
    name,
    password,
    username,
  });

  try {
    const result = await user.save();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Some error occurred while creating user",
    });
  }
};

const findUser = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const user = await UserModel.findOne({ username });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export default { createUser, findUser };
