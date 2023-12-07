/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import { useEffect, useState } from "react";
import {
  Box,
  Center,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineSearch,
  AiFillEyeInvisible,
} from "react-icons/ai";
import Loader from "./Loader";
import { debounce } from "lodash";
import DeleteConfirmation from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import useUserService from "../services/useUserService";

const UserTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { searchUser, getAllUsers } = useUserService();
  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  const isAdministator = loggedIn && loggedIn.role === "administrator";

  const getUsers = async () => {
    const AllUsers = await getAllUsers();
    setUsers(AllUsers.data?.data);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedApiCall = debounce(async (value) => {
    const response = await searchUser(value);
    if (response) {
      setUsers(response.data.data);
    }
  }, 1000);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
    debouncedApiCall(value);
  };

  const handleDelete = (user = null) => {
    setConfirmDeletion(!confirmDeletion);
    setSelectedUser(user);
  };

  return (
    <Center>
      <Box w={"90vw"}>
        <Box p={6}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children={<AiOutlineSearch />}
            />
            <Input
              name="name"
              placeholder="Search"
              type="text"
              variant="filled"
              value={search}
              onChange={handleSearch}
            />
          </InputGroup>
        </Box>
        {users ? (
          <TableContainer p={6}>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>User Id</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users &&
                  users.map((user) => (
                    <Tr key={user?._id}>
                      <Td>{user._id}</Td>
                      <Td>{user.name}</Td>
                      <Td>{user.email}</Td>
                      <Td>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Td>
                      {isAdministator ? (
                        <Td>
                          <Tooltip label="Edit">
                            <IconButton
                              mr={"4"}
                              variant="outline"
                              colorScheme="teal"
                              fontSize="22px"
                              icon={<AiFillEdit />}
                              onClick={() =>
                                navigate(`/users/${user?._id}/update`, {
                                  state: { user },
                                })
                              }
                            />
                          </Tooltip>
                          <Tooltip label="Delete">
                            <IconButton
                              variant="outline"
                              colorScheme="teal"
                              fontSize="22px"
                              icon={<AiFillDelete />}
                              onClick={() => handleDelete(user)}
                            />
                          </Tooltip>
                        </Td>
                      ) : (
                        <Td>
                          <Tooltip label="View">
                            <IconButton
                              variant="outline"
                              colorScheme="teal"
                              fontSize="22px"
                              icon={<AiFillEyeInvisible />}
                              onClick={() =>
                                navigate(`/users/${user?._id}/view`, {
                                  state: { user },
                                })
                              }
                            />
                          </Tooltip>
                        </Td>
                      )}
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Loader />
        )}
        <DeleteConfirmation
          enable={confirmDeletion}
          user={selectedUser}
          handleEnable={handleDelete}
        />
      </Box>
    </Center>
  );
};

export default UserTable;
