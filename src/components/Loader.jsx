import { Flex, Spinner, Text } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex
      h={"90vh"}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Spinner />
      <Text m={"2"}>Loading</Text>
    </Flex>
  );
};

export default Loader;
