import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

const EditEventModal = ({ isOpen, onClose, event }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [categoryIds, setCategoryIds] = useState([]);
  const [createdBy, setCreatedBy] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    const updatedEventData = {
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

    const updateEvent = async () => {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedEventData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Failed to edit event. Status: ${response.status}`);
      }
      return response.json();
    };

    try {
      await toast.promise(updateEvent(), {
        loading: { title: "Editing event...", description: "Please wait" },
        success: {
          title: "Event updated",
          description: "Looks great",
          isClosable: true,
          duration: 4000,
        },
        error: {
          title: "Failed to edit event",
          description: "Something went wrong",
        },
      });
      const id = (await updateEvent()).id;
      onClose();
    } catch (error) {
      console.error("Encountered error while editing event:", error);
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
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit: {event.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form onSubmit={handleUpdateEvent}>
            <Stack spacing={3}>
              <InputGroup size="sm">
                <InputLeftAddon w={125}>
                  <b>Title</b>
                </InputLeftAddon>
                <Input
                  placeholder={event.title}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon w={125}>
                  <b>Description</b>
                </InputLeftAddon>
                <Input
                  placeholder={event.description}
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
                  placeholder={event.image}
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
              </InputGroup>
              <InputGroup size="sm">
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
              <div className="asterix">
                <i>*Hold CTRL/ CMD to select multiple categories</i>{" "}
              </div>
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
            <div className="submit-button">
              <Button type="submit" colorScheme="blue" mr={3}>
                Save changes
              </Button>
            </div>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditEventModal;
