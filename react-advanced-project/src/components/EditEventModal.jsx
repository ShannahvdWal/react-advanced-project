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
  useEditableControls,
  Grid,
  GridItem,
  IconButton,
  Input,
  ButtonGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { Form } from "react-router-dom";

export const loader = async ({ params }) => {
  const events = await fetch("http://localhost:3000/events");

  return {
    events: await events.json(),
  };
};

const EditEventModal = ({ isOpen, onClose, event }) => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [categoryIds, setCategoryIds] = useState([]);
  const [createdBy, setCreatedBy] = useState();

  const updateEvent = async (event) => {
    // No error handling, normally you would do that.
    const response = await fetch(`http://localhost:3000/events/${params.eventId}`, {
      method: "PATCH",
      body: JSON.stringify(event),
      headers: { "Content-Type": "application/json;" },
    });
    event.id = (await response.json()).id;
    setEvents(events.id(event));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateEvent({
      title,
      // description,
      // image,
      // startTime,
      // endTime,
      // categoryIds,
      // createdBy, 
    });

    // Empty the form fields.
        setTitle("");
    // setDescription("");
    // setImage("");
    // setStartTime("");
    // setEndTime("");
    // setCategoryIds("");
  };

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <IconButton
        ml={3}
        colorScheme="blue"
        size="sm"
        icon={<EditIcon />}
        {...getEditButtonProps()}
      />
    );
  }
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit: {event.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Grid templateColumns="1fr 6fr" gap={4}>
              <GridItem className="titles">
                <p>
                  <b>Title:</b>
                </p>
                <p>
                  <b>Description:</b>
                </p>
                <p>
                  <b>Image URL:</b>
                </p>
                <p className="start-time">                  
                  <b>Start Time:</b>
                </p>
                <p>                  
                  <b>End Time:</b>
                </p>
                <p>                  
                  <b>Categories:</b>
                </p>
                <p>                  
                  <b>Author:</b>
                </p>
              </GridItem>
              <GridItem classname="editable">
                <Editable defaultValue={event.title} isPreviewFocusable={false}>
                  <EditablePreview bg className="input" />
                  <Input
                  onChange={(e) => setTitle(e.target.value)}
                  value={event.title}
                  as={EditableInput} />
                  <EditableControls />
                </Editable>
                <Editable
                  defaultValue={event.description}
                  isPreviewFocusable={false}
                >
                  <EditablePreview bg className="input" />
                  <Input as={EditableInput} />
                  <EditableControls />
                </Editable>
                <Editable defaultValue={event.image} isPreviewFocusable={false}>
                  <EditablePreview bg className="input" />
                  <Input as={EditableInput} />
                  <EditableControls />
                </Editable>
                <Editable
                  defaultValue={event.startTime}
                  isPreviewFocusable={false}
                >
                  <EditablePreview bg className="input" />
                  <Input as={EditableInput} />
                  <EditableControls />
                </Editable>
                <Editable
                  defaultValue={event.endTime}
                  isPreviewFocusable={false}
                >
                  <EditablePreview bg className="input" />
                  <Input as={EditableInput} />
                  <EditableControls />
                </Editable>
                <div>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="sports"
                    value={1}
                  />
                  <label className="checkbox" for="sports">
                    sports
                  </label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="games"
                    value={2}
                  />
                  <label className="checkbox" for="sports">
                    games
                  </label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="relaxation"
                    value={3}
                  />
                  <label for="relaxation">relaxation</label>
                </div>
                <div>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="ignacio"
                    value={1}
                  />
                  <label className="checkbox" for="ignacio">
                    Ignacio Doe
                  </label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="jane"
                    value={1}
                  />
                  <label className="checkbox" for="jane">
                    Jane Bennett
                  </label>
                </div>
              </GridItem>
            </Grid>
            <Button type="submit" colorScheme="blue" mr={3}>
            Save changes
            </Button>
          </Form>
        </ModalBody>

        <ModalFooter>

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditEventModal;
