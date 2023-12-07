/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, Flex, IconButton, Stack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import DeleteConfirmation from "./DeleteModal";

const PageActions = (props) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const isHomePage = location.pathname === "/";

  const handleNavigation = (navigateBack = true, addNew) => {
    if (navigateBack) {
      navigate("/");
    } else if (addNew) {
      navigate(`/products/add`);
    } else {
      navigate(`/products/${productId}/update`, { state: { product: props } });
    }
  };

  const toggleDeleteModal = () => setConfirmDeletion(!confirmDeletion);

  return (
    <Flex justifyContent={"space-between"} alignContent={"baseline"} my={"5"}>
      {!isHomePage ? (
        <IconButton
          colorScheme="teal"
          variant={"outline"}
          aria-label="Search database"
          icon={<BiArrowBack />}
          onClick={handleNavigation}
          rounded={"full"}
        />
      ) : (
        <span>&nbsp;</span>
      )}

      <Stack direction={"row"} gap={4}>
        {productId ? (
          <React.Fragment>
            <Button
              colorScheme="teal"
              variant={"outline"}
              leftIcon={<FiEdit />}
              onClick={() => handleNavigation(false)}
              rounded={"full"}
            >
              Update
            </Button>
            <Button
              colorScheme="teal"
              variant={"outline"}
              leftIcon={<FaTrashAlt />}
              onClick={() => setConfirmDeletion(!confirmDeletion)}
              rounded={"full"}
            >
              Delete
            </Button>
          </React.Fragment>
        ) : (
          <Button
            colorScheme="teal"
            variant={"outline"}
            leftIcon={<AiOutlinePlus />}
            onClick={() => handleNavigation(false, true)}
            rounded={"full"}
          >
            Add Product
          </Button>
        )}
      </Stack>
      <DeleteConfirmation
        enable={confirmDeletion}
        product={props}
        handleEnable={toggleDeleteModal}
      />
    </Flex>
  );
};

export default PageActions;
