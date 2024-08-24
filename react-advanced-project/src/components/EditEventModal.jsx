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
      method: "PUT",
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
                <Editable 
                  defaultValue={event.title} 
                  isPreviewFocusable={false}
                >
                  <EditablePreview bg className="input" />
                  <Input
                  onChange={(e) => setTitle(e.target.value)}
                  defaultValue={event.title} 
                  value={title}
                  id="title"
                  as={EditableInput}
                  />
                  <EditableControls />
                </Editable>
                <Editable
                  defaultValue={event.description}
                  isPreviewFocusable={false}
                >
                  <EditablePreview bg className="input" />
                  <Input 
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  as={EditableInput} />
                  <EditableControls />
                </Editable>
                <Editable defaultValue={event.image} isPreviewFocusable={false}>
                  <EditablePreview bg className="input" />
                  <Input 
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
                  as={EditableInput} />
                  <EditableControls />
                </Editable>
                <Editable
                  defaultValue={event.startTime}
                  isPreviewFocusable={false}
                >
                  <EditablePreview bg className="input" />
                  <Input 
                  onChange={(e) => setStartTime(e.target.value)}
                  type="datetime-local"
                  value={startTime}
                  as={EditableInput} />
                  <EditableControls />
                </Editable>
                <Editable
                  defaultValue={event.endTime}
                  isPreviewFocusable={false}
                >
                  <EditablePreview bg className="input" />
                  <Input 
                  onChange={(e) => setEndTime(e.target.value)}
                  type="datetime-local"
                  value={endTime}
                  as={EditableInput} />
                  <EditableControls />
                </Editable>     
                <div>       
                  <select onChange={handleChangeCategories} multiple>
                    <option value={1}>sports</option>
                    <option value={2}>games</option>
                    <option value={3}>relaxation</option>
                  </select>
                </div> 
                <div>
                  <select className="authors" onChange={handleChangeAuthors}>
                    <option value={1}>Ignacio Doe</option>
                    <option value={2}>Jane Bennett</option>
                  </select>
                </div> 
              </GridItem>
            </Grid>
            <div className="submit-button">
              <Button type="submit" colorScheme="blue" mr={3}>
              Save changes
              </Button>
            </div>
          </Form>
        </ModalBody>

        <ModalFooter>

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditEventModal;
