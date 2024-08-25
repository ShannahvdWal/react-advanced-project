import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import {
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Center,
  SimpleGrid,
  Radio,
  RadioGroup,
  Card,
  CardBody,
  Tag,
  Image,
  Stack,
} from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import "../css/style.css";

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

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [chosenCategory, setChosenCategory] = useState(0);
  const [query, setQuery] = useState("");

  return (
    <div className="event-list">
      <Heading className="heading-large">
        Upcoming Events
        <InputGroup marginTop={2}>
          <Input
            bg="white"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for events..."
          ></Input>
          <InputRightAddon>
            <SearchIcon />
          </InputRightAddon>
        </InputGroup>
      </Heading>
      <Center>
        <RadioGroup
          className="radio"
          defaultValue="0"
          onChange={setChosenCategory}
        >
          <Stack direction={{ base: "column", sm: "row" }} columnGap="10px">
            <Image
              marginRight={5}
              width={5}
              src="src/Assets/filter-solid.svg"
            />
            <Radio marginEnd={2} size="lg" value="0">
              All
            </Radio>
            <Radio marginEnd={2} size="lg" value="1">
              Sports
            </Radio>
            <Radio marginEnd={2} size="lg" value="2">
              Games
            </Radio>
            <Radio marginEnd={2} size="lg" value="3">
              Relaxation
            </Radio>
          </Stack>
        </RadioGroup>
      </Center>
      <ul>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {events &&
            events
              .filter((event) =>
                chosenCategory != 0
                  ? event.categoryIds.includes(Number(chosenCategory))
                  : events
              )
              .filter(({ title }) =>
                title.toLowerCase().includes(query.toLowerCase())
              )
              .map((event) => (
                <Card maxW="sm">
                  <Link to={`/event/${event.id}`}>
                    <li key={uuidv4()}>
                      <CardBody className="text">
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
                          <b>Categories: </b>
                          {categories
                            .filter((category) =>
                              event.categoryIds.includes(category.id)
                            )
                            .map((category) => (
                              <Tag marginEnd={2} key={uuidv4()}>
                                {category.name}
                              </Tag>
                            ))}
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
