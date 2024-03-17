import { Router } from "express";
import userController from "../controllers/userController.js";
import taskController from "../controllers/taskController.js";
import scheduleController from "../controllers/scheduleController.js";
import auth from "../middleware/authMiddleware.js";
import {
  validationDepartment,
  validationLogin,
  validationNv,
  validationRegistration,
  validationReview,
} from "../validation/index.js";

const router = Router();

router.post("/registration", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.patch("/user/:id", userController.updateUser);
router.get("/user/:id", userController.getUserById);
router.get("/task/:userId", taskController.getTask);
router.patch("/updateTask", taskController.updateTask);
router.post("/addTask/:userId", taskController.addTask);
router.delete("/removeTask", taskController.removeTask);
router.get("/schedule/:userId",scheduleController.getSchedule );
router.post("/schedule",scheduleController.addSchedule );
router.delete("/schedule",scheduleController.removeSchedule );
router.patch("/schedule",scheduleController.updateSchedule );
export default router;
