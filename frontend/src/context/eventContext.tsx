import { createContext, useState, useContext, useEffect } from "react";
import { type ReactNode } from "react";
import type { EventData } from "../types/event";
import axios from "axios";


interface EventContextType {
  events: EventData[];
  setEvents: React.Dispatch<React.SetStateAction<EventData[]>>;
  refreshKey: number;
  refreshEvents: () => void;
  isEventsLoading: boolean;
  setIsEventsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [isEventsLoading, setIsEventsLoading] = useState<boolean>(false);

  const refreshEvents = () => setRefreshKey((prev) => prev + 1);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsEventsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/event/get-events`);
        setEvents(response.data.data || []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setIsEventsLoading(false);
      }
    };

    fetchEvents();
  }, [refreshKey]);


  return (
    <EventContext.Provider value={{ events, setEvents, refreshKey, refreshEvents, isEventsLoading, setIsEventsLoading }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEventContext must be used within an EventProvider");
  }
  return context;
};