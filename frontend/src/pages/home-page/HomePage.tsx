import { Container, Stack } from "@mui/material"
import EventToolBar from "../../components/home-page/EventToolBar"
import { useEventContext } from "../../context/eventContext"
import { BeatLoader } from "react-spinners"
import EventsList from "../../components/home-page/EventsList"


const HomePage = () => {

  const { isEventsLoading, events } = useEventContext()
  return (
    <Container sx={{
      paddingBlock: '3rem',
    }}>

      <EventToolBar />

      {isEventsLoading ? (
        <Stack mt={10} alignItems={"center"} >
          <BeatLoader />
        </Stack>
      ) : (
        <EventsList events={events} />
      )}
    </Container>
  )
}

export default HomePage