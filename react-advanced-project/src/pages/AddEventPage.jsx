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
      <Heading paddingTop={10}>Add New Event</Heading>
      <Form>
        <Stack spacing={4} paddingTop={30}>
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
            <InputLeftAddon w={125}>Image</InputLeftAddon>
            <Input type="tel" placeholder="https://" />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon w={125}>Event Start</InputLeftAddon>
            <Input type="datetime-local"></Input>
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon w={125}>Event End</InputLeftAddon>
            <Input type="datetime-local"></Input>
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon w={125}>Creator</InputLeftAddon>
            <Input placeholder="User Name" />
          </InputGroup>
        </Stack>
        <Button marginTop={30}>Add event</Button>
      </Form>
    </div>
  );
};
