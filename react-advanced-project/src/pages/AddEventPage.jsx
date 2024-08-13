import React from "react";
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
  return (
    <div className="add-event">
      <Heading className="heading-large">Add New Event</Heading>
      <Form>
        <Stack spacing={4} maxW={600}>
          <InputGroup>
            <InputLeftAddon w={125}>
              <b>Title</b>
            </InputLeftAddon>
            <Input placeholder="event name" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon w={125}>
              <b>Description</b>
            </InputLeftAddon>
            <Input placeholder="brief event description" />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon w={125}>
              <b>Image</b>
            </InputLeftAddon>
            <Input type="tel" placeholder="https://" />
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
            ></Input>
            <InputLeftAddon w={125}>
              <b>Event End</b>
            </InputLeftAddon>
            <Input htmlSize={4} width="auto" type="datetime-local"></Input>
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon w={125}>
              <b>Creator</b>
            </InputLeftAddon>
            <Input placeholder="user name" />
          </InputGroup>
        </Stack>
        <Button marginTop={30}>Add event</Button>
      </Form>
    </div>
  );
};
