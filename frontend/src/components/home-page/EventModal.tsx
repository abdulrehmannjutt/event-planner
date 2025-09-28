import { useState, useEffect } from "react";
import {
    Modal,
    Box,
    Stack,
    TextField,
    Button,
    Typography,
    MenuItem,
} from "@mui/material";
import { CATEGORIES } from "../../mockData/data";
import type { EventData } from "../../types/event";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface EventModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: EventData) => void;
    initialData?: EventData;
    mode?: "add" | "edit";
}

const EventModal = ({
    open,
    onClose,
    onSubmit,
    initialData,
    mode = "add",
}: EventModalProps) => {
    const [formData, setFormData] = useState<EventData>({
        title: "",
        description: "",
        date: "",
        category: "",
    });

    console.log("🚀 ~ EventModal ~ initialData:", initialData?.date)


    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ title: "", description: "", date: "", category: "" });
        }
    }, [initialData, open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: "absolute" as const,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
            }}>
                <Typography variant="h6" mb={2}>
                    {mode === "add" ? "Create New Event" : "Edit Event"}
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={formData.date ? dayjs(formData.date) : null}
                            onChange={(newValue: Dayjs | null) => {
                                setFormData({ ...formData, date: newValue ? newValue.format("MM-DD-YYYY") : "" });
                            }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    required: true,
                                    inputProps: { readOnly: true },
                                }
                            }}
                        />
                    </LocalizationProvider>
                    <TextField
                        select
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        fullWidth
                    >
                        {CATEGORIES?.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleSubmit} disabled={!formData.title.trim() || !formData.date.trim()}
                        >
                            {mode === "add" ? "Save" : "Update"}
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
};

export default EventModal;
