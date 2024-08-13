import React from "react";
import { Heading, Card, CardBody, SimpleGrid } from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import "../css/style.css";

export const loader = async ({ params }) => {
  const events = await fetch("http://localhost:3000/events");
  const users = await fetch("http://localhost:3000/users");

  return {
    events: await events.json(),
    users: await users.json(),
  };
};

export const EventsPage = () => {
  const { events, users } = useLoaderData();

  return (
    <div className="event-list">
      <Heading className="heading-large">List of events</Heading>
      <ul>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {events &&
            events.map((event) => (
              <Card maxW="sm">
                <Link to={`/event/${event.id}`}>
                  <li key={event.id}>
                    <CardBody>
                      <Heading size="md">
                        <b>{event.title}</b>
                      </Heading>
                      <p>{event.description}</p>
                      <img src={event.image}></img>
                      <p>
                        <b>Start:</b> {event.startTime}
                      </p>
                      <p>
                        <b>End:</b> {event.endTime}
                      </p>
                      <p>
                        <b>Added by: </b>
                        {users.find((user) => event.createdBy === user.id).name}
                      </p>
                    </CardBody>
                  </li>
                </Link>
              </Card>
            ))}
        </SimpleGrid>
      </ul>
    </div>
  );
};
