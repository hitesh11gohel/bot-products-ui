/* eslint-disable react/prop-types */
import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useProductService from "../services/useProductService";

const DeleteConfirmation = ({ enable, handleEnable, product }) => {
  const navigate = useNavigate();
  const { deleteProduct } = useProductService();
  const onClose = () => handleEnable(false);

  const handleDelete = async (id) => {
    const res = await deleteProduct(id);
    if (res.status === 200) {
      navigate("/");
      onClose();
    }
  };

  return (
    <React.Fragment>
      <Modal isOpen={enable} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"3xl"}>Are you sure ?</Text>
            <Text>
              Do you really want to delete this{" "}
              <Text fontSize="m" as="b" color="red.500">
                {product ? product.name : "product"}
              </Text>{" "}
              ? This process cannot be undone.
            </Text>
            <Text colorScheme="red">{name}</Text>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme={"red"}
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteConfirmation;
