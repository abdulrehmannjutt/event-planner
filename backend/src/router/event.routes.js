import { Router } from "express";
import { createEvent, deleteEvent, getEvents, updateEvent } from "../controllers/event.controllers.js";

const router = Router();

router.post("/create-event", createEvent);
router.get("/get-events", getEvents);
router.patch("/update-event/:id", updateEvent);
router.delete("/delete-event/:id", deleteEvent);


export default router;