import express from "express";
const router = express.Router();
import {signup, login, logout} from "../controllers/auth.js"
import { protectRouter } from "../middlewares/authentication-middleware.js"
import { updateProfile } from "../controllers/auth.js"
import { checkAuth } from "../controllers/auth.js"


router.post("/signup",signup )
router.post("/login",login )
router.post("/logout",logout )

//appending route, if user want to update profile FIRST let's check if user is logged in
router.put("/update-profile", protectRouter, updateProfile)

//check if the user is authenticated -> profile page or login page depend on it
router.get("/check", protectRouter,checkAuth)

export default router;