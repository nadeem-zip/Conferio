import { Router } from "express";
import { login, register } from "../controllers/userController.js";

const router=Router();
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/sdd_to_activity");
router.route("/get_all_activitiy");

export default router;