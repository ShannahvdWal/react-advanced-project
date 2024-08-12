import React, { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:3000/events");
      const event = await response.json();
      setEvents(event);
    };
    fetchEvents();
  }, []);

  return (
    <div className="event-list">
      <Heading>List of events</Heading>
      <ul>
        {events &&
          events.map((event) => (
            <li key={event.id}>
              <b>{event.title}</b>
            </li>
          ))}
      </ul>
    </div>
  );
};
