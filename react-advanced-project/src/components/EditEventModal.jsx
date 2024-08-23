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
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit: {event.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Form>
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
              </GridItem>
              <GridItem classname="editable">
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
