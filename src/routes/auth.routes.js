import { Router } from "express";
import {
  login,
  register, 
  logout,
  profile,
  verifyToken
  }from '../controllers/auth.controller.js'
import {authRequired} from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchemas, loginSchema} from "../schemasValidator/auth.schemas.js";

const router = Router()
router.post('/register', validateSchema( registerSchemas), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/verify', verifyToken);
router.get('/profile',authRequired, profile);


export default router;