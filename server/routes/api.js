
// Dependencies
import express from "express";
import * as taskController from '../app/controllers/taskControllers.js';
import * as featuresController from "../app/controllers/featuresController.js";
import { authenticationMiddleware } from "../app/middlewares/authMiddleware.js";



// Create Route
const router = express.Router();



//---- Task -----
router.post('/createTask', taskController.createTask);
router.get('/readTask', taskController.readTask);



// Token Encode
router.post('/token-encode', featuresController.Token_Encode);
// Token Decode
router.get('/token-decode', featuresController.Token_Decode);
// Email Send
router.post('/email-send', featuresController.Email_Sender);
// Authentication middleware checking
router.get('/profile', authenticationMiddleware, featuresController.Profile);
// Cookie Set
router.get('/cookie-set', featuresController.Cookie_Set);
// Cookie Remove
router.get('/cookie-remove', featuresController.Cookie_Remove);



// Finally Export
export default router;
