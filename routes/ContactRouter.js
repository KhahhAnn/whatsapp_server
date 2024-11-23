import express from "express";
import { authenticateToken } from "../security/JwtConfig.js";
import { createContact, deleteContact, getContactsByUser, updateContact, acceptContactRequest, getContactsByContactUserId } from "../controllers/ContactController.js";

const ContactRouter = express.Router();

ContactRouter.post("", authenticateToken, createContact);
ContactRouter.put("/:contactId", authenticateToken, updateContact);
ContactRouter.delete("/:contactId", authenticateToken, deleteContact);
ContactRouter.get("/contacts-user/:userId", authenticateToken, getContactsByUser);
ContactRouter.post("/accept", authenticateToken, acceptContactRequest);
ContactRouter.get("/contacts-contact-user/:contactUserId", authenticateToken, getContactsByContactUserId);
export default ContactRouter;
