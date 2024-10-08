import React from "react";
import {
  Button,
  Card,
  CardBody,
  CloseButton,
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
  const navigate = useNavigate();

  const handleDeleteEvent = async (e) => {
    if (window.confirm("Do you really want to delete this event?")) {
      await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      });
      navigate(`/`);
    }
  };

  const exitEventPage = () => {
    navigate("/");
  };

  const reformattedStartTime = new Date(event.startTime).toLocaleString([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const reformattedEndTime = new Date(event.endTime).toLocaleString([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="event-page">
      <Card margin className="event-page-card" maxW={625}>
        <li key={event.id}>
          <CardBody className="text">
            <CloseButton size="lg" onClick={exitEventPage} className="close" />
            <img className="event-image" src={event.image}></img>
            <Grid templateColumns="2fr 1fr" gap={4} padding={5}>
              <GridItem>
                <Heading size="lg">
                  <b>{event.title}</b>
                </Heading>
                <p>{event.description}</p>
                <p className="event-times">
                  <b>Start: </b>
                  {reformattedStartTime}
                </p>
                <p>
                  <b>End: </b> {reformattedEndTime}
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
                <Button
                  onClick={handleDeleteEvent}
                  className="delete"
                  colorScheme="red"
                >
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
