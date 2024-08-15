import React, { useState } from "react";
import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";

export const AddEventPage = () => {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

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

  const createCategory = async (category) => {
    // No error handling, normally you would do that.
    const response = await fetch("http://localhost:3000/categories", {
      method: "POST",
      body: JSON.stringify(category),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
    category.id = (await response.json()).id;
    setCategories(category.concat(category));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createEvent({ title, description, image, startTime, endTime });
    createCategory({ category });

    // Empty the form fields.
    setTitle("");
    setDescription("");
    setImage("");
    setStartTime("");
    setEndTime("");
    setCategory("");
  };

  return (
    <div className="add-event">
      <Heading className="heading-large">Add New Event</Heading>
      <Form onSubmit={handleSubmit}>
        <Stack spacing={4} maxW={600}>
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
              <b>Categories</b>
            </InputLeftAddon>
            <Input
              type="checkbox"
              onChange={(e) => setCategories(e.target.value)}
              value={category}
            />
          </InputGroup>
        </Stack>
        <Button type="submit" marginTop={30}>
          Add event
        </Button>
      </Form>
    </div>
  );
};
