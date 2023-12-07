/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Heading,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import { RxDashboard } from "react-icons/rx";
import { FaUserCircle, FaRegMoon } from "react-icons/fa";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { toggleColorMode } = useColorMode();

  const Logout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <Box
      px={4}
      bg={useColorModeValue("gray.100", "gray.900")}
      display={localStorage.getItem("loggedIn") ? "block" : "none"}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack
          spacing={8}
          alignItems={"center"}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Heading size="md">Bot Products</Heading>
        </HStack>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <IconButton
                colorScheme="teal"
                fontSize="22px"
                variant={"ghost"}
                icon={<FaUserCircle />}
              />
            </MenuButton>
            <MenuList>
              {localStorage.getItem("loggedIn") && (
                <MenuItem disabled>
                  <AiOutlineUser fontSize="22px" />
                  <Text ml={"2"}>
                    {JSON.parse(localStorage.getItem("loggedIn")).name}
                  </Text>
                </MenuItem>
              )}
              <MenuItem onClick={() => navigate("/")}>
                <RxDashboard />
                <Text ml={"2"}>Dashboard</Text>
              </MenuItem>
              <MenuItem onClick={toggleColorMode}>
                <FaRegMoon />
                <Text ml={"2"}>Toggle Theme</Text>
              </MenuItem>
              <MenuItem onClick={Logout}>
                <AiOutlineLogout fontSize="22px" />
                <Text ml={"2"}>Logout</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}
