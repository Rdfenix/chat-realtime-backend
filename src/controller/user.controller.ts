import UserModel from "../models/user";
import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
  if (!req.body.name || !req.body.username || !req.body.password) {
    res.status(400).json({ user: "", message: "Content cant be empty" });
  }

  const { name, password, username } = req.body;

  const user = new UserModel({
    name,
    password,
    username,
  });

  try {
    const result = await user.save();
    res.status(200).json({ user: result, message: "Created" });
  } catch (error: any) {
    res.status(500).json({
      user: "",
      message: error.message || "Some error occurred while creating user",
    });
  }
};

const findUser = async (req: Request, res: Response) => {
  try {
    const idUser = req.query.id;
    const user = await UserModel.findById(idUser);
    res.status(200).json({ user, message: "Found" });
  } catch (error: any) {
    res.status(404).json({ user: "", message: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).json({ user: "", message: "Content cant be empty" });
    }

    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user && user.password === password) {
      res.status(200).json({ user, message: "signIn" });
    } else {
      res.status(401).json({ user: "", message: "Unauthorized" });
    }
  } catch (error: any) {
    res.status(404).json({ user: "", message: error.message });
  }
};

export default { createUser, findUser, loginUser };
