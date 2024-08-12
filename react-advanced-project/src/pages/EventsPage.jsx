import React, { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

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
      <Heading>List of events</Heading>
      <ul>
        {events &&
          events.map((event) => (
            <li key={event.id}>
              <b>{event.title}</b>
              <p>{event.description}</p>
              <img src={event.image}></img>
              <p>{event.startTime}</p>
              <p>{event.endTime}</p>
              <p>{users.find((user) => event.createdBy === user.id).name}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
