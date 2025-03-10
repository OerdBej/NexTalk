import express from "express";
const router = express.Router();
import {signup, login, logout} from "../controllers/auth.js"

router.post("/signup",signup )
router.post("/login",login )
router.post("/logout",logout )

//appending route
router.put("/update-profile", protectRouter, updateProfile)


export default router;