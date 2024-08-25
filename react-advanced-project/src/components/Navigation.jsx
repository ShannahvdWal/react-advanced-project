import { Box, Button, Center } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Box className="navigation">
      <nav>
        <ul>
          <Button marginLeft={4} marginRight={4}>
            <li>
              <Link to="/">All Events</Link>
            </li>
          </Button>
          <Button marginLeft={4} marginRight={4}>
            <li>
              <Link to="/add-event">Add Event</Link>
            </li>
          </Button>
        </ul>
      </nav>
    </Box>
  );
};
