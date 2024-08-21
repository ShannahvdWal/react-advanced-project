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
import { Form } from "react-router-dom";

const EditEventModal = ({ isOpen, onClose, event }) => {
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
            <Grid templateColumns="1fr 4fr" gap={4}>
              <GridItem className="titles">
                <p>
                  <b>Title:</b>
                </p>
                <p>
                  <b>Description:</b>
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
                <Editable
                  defaultValue={event.startTime}
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
                  defaultValue={event.endTime}
                  isPreviewFocusable={false}
                >
                  <EditablePreview bg className="input" />
                  <Input as={EditableInput} />
                  <EditableControls />
                </Editable>
                <Editable
                  defaultValue={event.createdBy}
                  isPreviewFocusable={false}
                >
                  <EditablePreview bg className="input" />
                  <Input as={EditableInput} />
                  <EditableControls />
                </Editable>
                <Editable defaultValue={user.image} isPreviewFocusable={false}>
                  <EditablePreview bg className="input" />
                  <Input as={EditableInput} />
                  <EditableControls />
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
