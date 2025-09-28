import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material"
import EventModal from "./EventModal";
import axios from "axios";
import toast from "react-hot-toast";
import { CATEGORIES } from "../../mockData/data";
import { useEventContext } from "../../context/eventContext";
import type { EventData } from "../../types/event";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EventToolBar = () => {

    const [open, setOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    const { events, setEvents, refreshEvents } =
        useEventContext();


    const handleAdd = async (data: EventData) => {
        try {
            await axios.post(`${API_BASE_URL}/event/create-event`, data)
            toast.success("Event created!");
            refreshEvents();
        } catch (err) {
            toast.error("Failed to create event.");
        }
    };

    const handleFilter = async (category: string) => {
        if (activeFilter === category) {
            setActiveFilter(null);
            refreshEvents();
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/event/get-events`, {
                params: {
                    category: category,
                },
            });

            setEvents(response?.data?.data)
            setActiveFilter(category);
        } catch (err) {
            console.error(err);

        }

    }

    console.log("🚀 ~ EventToolBar ~ events:", events.length > 0);
    console.log("🚀 ~ EventToolBar ~ activeFilter:", activeFilter);
    return (
        <Box mb={4}>
            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" spacing={2}>

                    <Button variant="contained" onClick={() => setOpen(true)}>Add Event</Button>

                </Stack>

                {(events.length > 0 || activeFilter) && (
                    <Box>
                        <Typography variant="body1" mb={1}>Filter by category</Typography>
                        <Stack direction="row" spacing={2}>

                            {CATEGORIES?.map((cat, index) => (
                                <Button
                                    key={index}
                                    variant={activeFilter === cat ? "outlined" : "contained"}
                                    color="primary"
                                    onClick={() => handleFilter(cat)}
                                >
                                    {cat}
                                </Button>
                            ))}

                            {activeFilter && (
                                <Button variant="outlined" color="warning" onClick={() => {
                                    setActiveFilter(null);
                                    refreshEvents();
                                }}>
                                    Reset Filter
                                </Button>
                            )}
                        </Stack>
                    </Box>
                )}

            </Stack>

            <EventModal
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleAdd}
                mode="add"
            />
        </Box >
    )
}

export default EventToolBar