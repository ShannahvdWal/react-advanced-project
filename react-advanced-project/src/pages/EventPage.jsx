import React from "react";
import {
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  Heading,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import EditEventModal from "../components/EditEventModal";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteEvent = async () => {
    // No error handling, normally you would do that.
    const response = await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
    });
    useNavigate("/");
  };

  return (
    <div className="event-page">
      <Card className="event-page-card" maxW={750}>
        <li key={event.id}>
          <CardBody>
            <img src={event.image}></img>
            <Grid templateColumns="2fr 1fr" gap={4} padding={5}>
              <GridItem>
                <Heading size="lg">
                  <b>{event.title}</b>
                </Heading>
                <p>{event.description}</p>
                <p className="event-times">
                  <b>Start: </b>
                  {event.startTime}
                </p>
                <p>
                  <b>End: </b> {event.endTime}
                </p>
                <p>
                  <b>Categories: </b>
                  {categories
                    .filter((category) =>
                      event.categoryIds.includes(category.id)
                    )
                    .map((category) => (
                      <Tag marginEnd={2} key={category.id}>
                        {category.name}
                      </Tag>
                    ))}
                </p>
              </GridItem>
              <GridItem>
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
              </GridItem>
              <div className="event-edit-buttons">
                <Button onClick={onOpen} className="edit" colorScheme="orange">
                  <EditIcon />
                  <EditEventModal
                    isOpen={isOpen}
                    onClose={onClose}
                    event={event}
                    users={users}
                  />
                </Button>
                <Button onClick={deleteEvent} className="delete" colorScheme="red">
                  <DeleteIcon />
                </Button>
              </div>
            </Grid>
          </CardBody>
        </li>
      </Card>
    </div>
  );
};
