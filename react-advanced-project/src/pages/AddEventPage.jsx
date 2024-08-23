import React, { useState } from "react";
import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
} from "@chakra-ui/react";
import { Form, useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  const events = await fetch("http://localhost:3000/events");
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    events: await events.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const AddEventPage = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [categoryIds, setCategoryIds] = useState([]);

  const createEvent = async (event) => {
    // No error handling, normally you would do that.
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(event),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
    event.id = (await response.json()).id;
    setEvents(events.concat(event));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createEvent({
      title,
      description,
      image,
      startTime,
      endTime,
      categoryIds,
    });

    // Empty the form fields.
    setTitle("");
    setDescription("");
    setImage("");
    setStartTime("");
    setEndTime("");
    setCategoryIds("");
  };


  return (
    <div className="add-event">
      <Heading className="heading-large">Add New Event</Heading>
      <Form onSubmit={handleSubmit}>
        <Stack spacing={4} maxW={650}>
          <InputGroup>
            <InputLeftAddon w={125}>
              <b>Title</b>
            </InputLeftAddon>
            <Input
              placeholder="event name"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon w={125}>
              <b>Description</b>
            </InputLeftAddon>
            <Input
              placeholder="brief event description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon w={125}>
              <b>Image</b>
            </InputLeftAddon>
            <Input
              type="url"
              placeholder="https://"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon w={125}>
              <b>Event Start</b>
            </InputLeftAddon>
            <Input
              htmlSize={4}
              width="auto"
              type="datetime-local"
              marginRight={10}
              onChange={(e) => setStartTime(e.target.value)}
              value={startTime}
            ></Input>
            <InputLeftAddon w={125}>
              <b>Event End</b>
            </InputLeftAddon>
            <Input
              htmlSize={4}
              width="auto"
              type="datetime-local"
              onChange={(e) => setEndTime(e.target.value)}
              value={endTime}
            ></Input>
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon w={125}>
              <b>Categories*</b>
            </InputLeftAddon>
            <select placeholder="hold ctrl/ cmd to select multiple" multiple>
              <option value={1}>sports</option>
              <option value={2}>games</option>
              <option value={3}>relaxation</option>
            </select>
          </InputGroup>
          <div className="asterix"><i>*Hold CTRL/ CMD to select multiple categories</i> </div>
        </Stack>
        <Button type="submit" marginTop={30}>
          Add event
        </Button>
      </Form>
    </div>
  );
};
