import React, { useState } from "react";
import {
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Center,
  SimpleGrid,
  Button,
  Card,
  CardBody,
  Tag,
  Image,
} from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import "../css/style.css";

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


export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [query, setQuery] = useState(" ");

  return (
    <div className="event-list">
      <Heading className="heading-large">
        Upcoming Events
        <InputGroup>
          <Input
            onChange={(event) => setQuery(event.target.value)}
            setQuery={setQuery}
            placeholder="Search for events..."
          ></Input>
          <InputRightAddon>
            <SearchIcon />
          </InputRightAddon>
        </InputGroup>
      </Heading>
      <Center>
        <Image marginRight={5} width={5} src="src/Assets/filter-solid.svg" />
        {categories.map((category) => (
          <Button
            // onClick={handleClick}
            marginEnd={2}
            size="md"
            key={category.id}
            value={category.id}
          >
            {category.name}
          </Button>
        ))}
      </Center>
      <ul>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {events &&
            events
              .filter((event) => {
                return query.toLowerCase() === " "
                  ? event
                  : event.title.toLowerCase().includes(query);
            })

              .map((event) => (
                <Card maxW="sm">
                  <Link to={`/event/${event.id}`}>
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
