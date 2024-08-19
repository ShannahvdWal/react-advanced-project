import React from "react";
import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const EventPage = () => {
  const { eventId } = useParams();
  return (
    <div>
      <Heading>{eventId}</Heading>
    </div>
  );
};
