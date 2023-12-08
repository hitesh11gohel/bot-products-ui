import { Center, Text, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Center
      color={"teal.500"}
      bg={useColorModeValue("gray.100", "gray.900")}
      p={3}
    >
      <Text fontWeight={"m"}>Developed by Hitesh Gohel</Text>
    </Center>
  );
};

export default Footer;
