import React, { useState } from "react";
import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Form, useNavigate } from "react-router-dom";

export const loader = async () => {
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
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [categoryIds, setCategoryIds] = useState([]);
  const [createdBy, setCreatedBy] = useState();
  const toast = useToast()
  const navigate = useNavigate();

  const handleCreateEvent = async (e) => { 
    e.preventDefault();

    const createEventData = {
      title,
      description,
      image,
      startTime,
      endTime,
      categoryIds,
      createdBy,
    };
      
    setTitle("");
    setDescription("");
    setImage("");
    setStartTime("");
    setEndTime("");
    setCategoryIds("");
    setCreatedBy("");
    
    const createEvent = async () => {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        body: JSON.stringify(createEventData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Failed to create event. Status: ${response.status}`);
      }
      return response.json();
      };

      try {
        await toast.promise(createEvent(), {
          loading: { title: "Creating event...", description: "Please wait" },
          success: {
            title: "Event created",
            description: "Looks great",
            isClosable: true,
            duration: 4000,
          },
          error: {
            title: "Failed to create event",
            description: "Something went wrong",
          },
        });
        navigate(`/`);
      } catch (error) {
        console.error("Encountered error while creating event:", error);
      }
    };

    const handleChangeCategories = (e) => {
      const categoryIds = [...e.target.selectedOptions].map(
        (option) => +option.value
      );
      setCategoryIds(categoryIds);
    };

  const handleChangeAuthors = (e) => {
    const createdBy = [...e.target.selectedOptions].map(
      (option) => +option.value
    );
    setCreatedBy(createdBy);
  };
  

  return ( 
    <div className="add-event">
      <Heading className="heading-large">Add New Event</Heading>
      <Form onSubmit={handleCreateEvent}>
        <Stack spacing={4} maxW={650}>
          <InputGroup>
            <InputLeftAddon w={125}>
              <b>Title</b>
            </InputLeftAddon>
            <Input
              type="text"
              minlength="3" 
              maxlength="25"
              placeholder="event name"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon w={125}>
              <b>Description</b>
            </InputLeftAddon>
            <Input
              type="text"
              minlength="8" 
              maxlength="75"
              placeholder="brief event description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
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
              required
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
              required
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
              required
            ></Input>
          </InputGroup>
          <div className="asterix"><i>*Hold CTRL/ CMD to select multiple categories</i> </div>
          <InputGroup size="sm">
            <InputLeftAddon w={125}>
              <b>Categories*</b>
            </InputLeftAddon>
            <select required onChange={handleChangeCategories} multiple>
              <option value={1}>sports</option>
              <option value={2}>games</option>
              <option value={3}>relaxation</option>
            </select>
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon w={125}>
              <b>Author</b>
            </InputLeftAddon>
              <select className="authors" onChange={handleChangeAuthors}>
                <option>- select author -</option>
                <option value={1}>Ignacio Doe</option>
                <option value={2}>Jane Bennett</option>
              </select>
          </InputGroup>
          
        </Stack>
        <Button colorScheme="blue" type="submit" marginTop={30}>
          Add event
        </Button>
      </Form>
    </div>
  );
};
