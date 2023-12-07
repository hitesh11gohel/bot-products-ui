/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";

const ProductCard = ({ cardInfo }) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(`/products/${cardInfo._id}`);

  return (
    <Card maxW={"sm"} onClick={handleNavigate} style={{ cursor: "pointer" }}>
      <CardBody>
        <Image
          objectFit="cover"
          src={cardInfo.image}
          alt="random-image"
          borderRadius="lg"
          w={350}
          h={200}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{cardInfo.title}</Heading>
          <Text color="teal.500" fontSize="2xl">
            {cardInfo.name}
          </Text>
          <Text>Description : {cardInfo.description}</Text>
          <Text>
            Type :{" "}
            {cardInfo.productType.charAt(0).toUpperCase() +
              cardInfo.productType.substr(1)}
          </Text>
          <Text>URL : {cardInfo.url}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
