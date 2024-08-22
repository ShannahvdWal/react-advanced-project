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
  InputGroup,
  ButtonGroup,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";

const EditEventModal = ({ isOpen, onClose, event, users }) => {
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit: {event.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form>
            <Grid grid-auto-cols="1fr" templateColumns="1fr 4fr" gap={4}>
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

              </GridItem>
              <GridItem>
                <Editable defaultValue={event.title} isPreviewFocusable={false}>
                  <EditablePreview bg className="input" />
                  <Input as={EditableInput} />
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
                    <input type="checkbox" id="sports" value={1}>
                    <label for="sports">sports</label>
                    <input type="checkbox" id ="games" value={2}>
                    <label for="sports">games</label>
                    <input type="checkbox" id="relaxation" value={3}>
                    <label for="relaxation">relaxation</label>
                </div>
                <Editable>
                  <select defaultValue={event.createdBy} multiple>
                    <option value={"1"}>Ignacio Doe</option>
                    <option value={"2"}>Jane Bennett</option>
                  </select>
                </Editable>
              </GridItem>
            </Grid>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditEventModal;
