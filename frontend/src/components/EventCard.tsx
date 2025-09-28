import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import type { EventData } from "../types/event";
import axios from "axios";
import toast from "react-hot-toast";
import EventModal from "./home-page/EventModal";
import { useState } from "react";
import { useEventContext } from "../context/eventContext";


const EventCard = ({
    _id,
    title,
    description,
    date,
    category,
}: EventData) => {

    const [openModal, setOpenModal] = useState(false);
    const { refreshEvents } =
        useEventContext();

    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/event/delete-event/${_id}`)
            refreshEvents();
            toast.success("Event deleted!");

        }
        catch (error) {
            toast.error("Error deleting event");
        }
    }

    const handleEdit = async (data: EventData) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/event/update-event/${_id}`, data)
            refreshEvents();
            toast.success("Event updated!");
        }
        catch (error) {
            toast.error("Error updating event");
        }
    }
    return (
        <>
            <Card
                sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 3,
                    position: "relative",
                    height: "100%",

                }}
            >
                {/* Content */}
                <CardContent sx={{ bgcolor: "white" }}>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            justifyContent: "flex-end",
                        }}
                    >
                        <IconButton size="small" color="error" onClick={handleDelete}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="primary" onClick={() => setOpenModal(true)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        {title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mb={1}>
                        {description}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                        <CalendarTodayIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                            {date}
                        </Typography>
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                        {category}
                    </Typography>

                </CardContent>
            </Card>

            <EventModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleEdit}
                mode="edit"
                initialData={{ title, description, date, category }}
            />
        </>
    );
}

export default EventCard