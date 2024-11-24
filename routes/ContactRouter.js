import express from "express";
import { authenticateToken } from "../security/JwtConfig.js";
import { createContact, deleteContact, getContactsByUser, updateContact, acceptContactRequest, rejectContactRequest, getContactsByContactUserId, getPendingContacts } from "../controllers/ContactController.js";

const ContactRouter = express.Router();

ContactRouter.post("", authenticateToken, createContact);
ContactRouter.post("/accept", authenticateToken, acceptContactRequest);
ContactRouter.post("/reject", authenticateToken, rejectContactRequest);

ContactRouter.put("/:contactId", authenticateToken, updateContact);
ContactRouter.delete("/:contactId", authenticateToken, deleteContact);

ContactRouter.get("/contacts-user/:userId", authenticateToken, getContactsByUser);
ContactRouter.get("/contacts-contact-user/:contactUserId", authenticateToken, getContactsByContactUserId);
ContactRouter.get("/pending-contacts/:contactUserId", authenticateToken, getPendingContacts);
export default ContactRouter;
