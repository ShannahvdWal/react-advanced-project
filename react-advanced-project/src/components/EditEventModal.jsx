import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  useEditableControls,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

const EditEventModal = ({ isOpen, onClose, event }) => {
  // const [events, setEvents] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [categoryIds, setCategoryIds] = useState([]);
  const [createdBy, setCreatedBy] = useState();

  const updateEvent = async (e) => {
    // No error handling, normally you would do that.
    const response = await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PATCH",
      body: JSON.stringify(e),
      headers: { "Content-Type": "application/json" },
    });
    // event.id = (await response.json()).id;
    // useNavigate(`/events/${id}`)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    updateEvent({
      title,
      description,
      image,
      startTime,
      endTime,
      categoryIds,
      createdBy,
    });
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
          <Form onSubmit={handleSubmit}>
          <Stack spacing={3}>
          <InputGroup size="sm">
            <InputLeftAddon w={125}>
              <b>Title</b>
            </InputLeftAddon>
            <Input
              placeholder="event name"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </InputGroup>
          <InputGroup size="sm">
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
          <div className="asterix"><i>*Hold CTRL/ CMD to select multiple categories</i> </div>
          <InputGroup size="sm">
            <InputLeftAddon w={125}>
              <b>Categories*</b>
            </InputLeftAddon>
            <select onChange={handleChangeCategories} multiple>
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
