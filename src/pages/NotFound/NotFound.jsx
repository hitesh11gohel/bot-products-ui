import { useNavigate } from "react-router-dom";
import PageNotFound from "../../assets/notFound.png";
import { Avatar, Button, Container, Flex } from "@chakra-ui/react";
import "./NotFound.scss";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Flex
        h={"86.5vh"}
        direction={"column"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Avatar
          src={PageNotFound}
          width={"100%"}
          height={"75vh"}
          alt="page-not-found"
        />
        <Button
          variant="outlined"
          color="teal.500"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Flex>
    </Container>
  );
};

export default NotFound;
