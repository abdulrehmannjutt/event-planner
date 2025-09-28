import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { EventModel } from "../models/event.model.js";

const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, category } = req.body;

  if (!title?.trim() || !date?.trim()) {
    throw new ApiError(400, "Missing required fields.");
  }

  const event = await EventModel.create({
    title,
    description,
    date,
    category,
  });

  res.status(201).json(new ApiResponse(201, "Event created successfully", event));

});

const getEvents = asyncHandler(async (req, res) => {

  const { category } = req.query;
  const filter = {};
  if (category) filter.category = category;

  const events = await EventModel.find(filter)
    .select('-__v -createdAt -updatedAt')
    .sort({ createdAt: -1 });

  return res.status(200).json(new ApiResponse(200, "Events retrieved successfully", events));
});

const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, date, category } = req.body;

  const event = await EventModel.findById(id);

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  const updatedEvent = await EventModel.findByIdAndUpdate(
    id,
    { title, description, date, category },
    { new: true }
  );

  res.status(200).json(new ApiResponse(200, "Event updated successfully", updatedEvent));
});

const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const event = await EventModel.findById(id);

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  await EventModel.findByIdAndDelete(id);

  res.status(200).json(new ApiResponse(200, "Event deleted successfully", null));
});

export { createEvent, getEvents, updateEvent, deleteEvent };