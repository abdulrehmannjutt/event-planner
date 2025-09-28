import { Grid, Typography } from "@mui/material"
import EventCard from "../EventCard"
import type { EventData } from "../../types/event"

const EventsList = ({ events }: { events: EventData[] }) => {

    return (
        <Grid container spacing={3}>

            {events.length > 0 ? (events?.map((event, index) => (
                <Grid size={{
                    xs: 12,
                    sm: 6,
                    md: 4,
                    lg: 3,
                }} key={index}>
                    <EventCard _id={event?._id!} title={event?.title} description={event?.description} date={event?.date} category={event?.category} />
                </Grid>
            ))) : (
                <Grid size={12}>

                    <Typography sx={{ textAlign: "center" }}>No events found.</Typography>
                </Grid>
            )}
        </Grid>
    )
}

export default EventsList