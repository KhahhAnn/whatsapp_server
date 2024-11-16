import express from "express";
import { authenticateToken } from "../security/JwtConfig.js";
import { createContact, deleteContact, getContactsByUser, updateContact, acceptContactRequest } from "../controllers/ContactController.js";

const ContactRouter = express.Router();

ContactRouter.post("", authenticateToken, createContact);
ContactRouter.put("/:contactId", authenticateToken, updateContact);
ContactRouter.delete("/:contactId", authenticateToken, deleteContact);
ContactRouter.get("/contacts-user/:userId", authenticateToken, getContactsByUser);
ContactRouter.post("/accept", authenticateToken, acceptContactRequest);
export default ContactRouter;
