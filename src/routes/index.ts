import { Router, Request, Response } from "express";
import userController from "../controller/user.controller";
import roomController from "../controller/room.controller";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "First Route of API about lets talk application",
  });
});

//signIn
router.post("/signin", userController.loginUser);

//user routes
router.get("/user", userController.findUser);
router.post("/create/user", userController.createUser);

//room routes
router.get("/rooms", roomController.getAllRooms);
router.get("/room", roomController.getRoom);
router.post("/create/room", roomController.createRoom);
router.delete("/delete/room", roomController.deleteRoom);

export default router;
