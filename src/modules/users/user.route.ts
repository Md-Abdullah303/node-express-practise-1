import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";


const router = Router()

export const userRouter = router


//* All methods
router.get("/",auth, userController.getAllUser)
router.get("/:id", userController.getUser)
router.post("/", userController.createUser)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)