import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <Button>
          <li>
            <Link to="/">Events</Link>
          </li>
        </Button>
        <Button>
          <li>
            <Link to="/event/1">Event</Link>
          </li>
        </Button>
        <Button>
          <li>
            <Link to="/add-event">Add Event</Link>
          </li>
        </Button>
      </ul>
    </nav>
  );
};
