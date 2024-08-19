import React from "react";
import { Card, CardBody, Heading, Tag } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");

  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  return (
    <div className="event-page">
      <Card>
        <li key={event.id}>
          <CardBody>
            <Heading size="md">
              <b>{event.title}</b>
            </Heading>
            <p>{event.description}</p>
            <img src={event.image}></img>
            <p>
              <b>Start: </b>
              {event.startTime}
            </p>
            <p>
              <b>End: </b> {event.endTime}
            </p>
            <p>
              <b>Created by:</b>

              {users
                .filter((user) => event.createdBy === user.id)
                .map((user) => (
                  <li marginEnd={2} key={user.id}>
                    <img className="user-portrait" src={user.image}></img>
                    {user.name}
                  </li>
                ))}
            </p>
            <p>
              <b>Categories: </b>
              {categories
                .filter((category) => event.categoryIds.includes(category.id))
                .map((category) => (
                  <Tag marginEnd={2} key={category.id}>
                    {category.name}
                  </Tag>
                ))}
            </p>
          </CardBody>
        </li>
      </Card>
    </div>
  );
};
