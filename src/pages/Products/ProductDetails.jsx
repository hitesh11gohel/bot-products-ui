/* eslint-disable react/prop-types */
import React from "react";
import {
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import useProductService from "../../services/useProductService";
import PageActions from "../../components/PageActions";

const Content = ({ label, value, clickable = false }) => (
  <Flex gap={2} alignItems={"center"}>
    <Text>{label} :</Text>
    {clickable ? (
      <Link target="_blank" to={value}>
        <Text py="2" color="teal.500">
          {value}
        </Text>
      </Link>
    ) : (
      <Text py="2" color="teal.500">
        {value}
      </Text>
    )}
  </Flex>
);

const ProductDetails = () => {
  const { productId } = useParams();
  const { getProduct } = useProductService();
  const [product, setProduct] = React.useState([]);

  const getProductInfo = async (productId) => {
    const res = await getProduct(productId);
    if (res.status === 200) {
      setProduct(res.data.data);
    }
  };

  React.useEffect(() => {
    getProductInfo(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <Center>
      <Box h={{ base: "auto" }} minH={"86vh"} w={"90vw"} mb={6}>
        <PageActions {...product} />
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Box w={850} h={400}>
            <Image
              objectFit="cover"
              maxW={{ base: "100%", lg: "500px", md: "25%" }}
              src={product.image ?? `https://picsum.photos/id/11/350/200`}
              alt="..."
              w={"100%"}
              h={"100%"}
            />
          </Box>

          <Center>
            <Stack>
              <CardBody>
                <Heading size="md" color="teal.500">
                  {product?.name}
                </Heading>
                <Text py="2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus, eos quos? Repellat dignissimos eum nam quas unde
                  reprehenderit sint enim. Iure accusamus veniam commodi,
                  eligendi eveniet voluptatum et doloremque odio! Lorem, ipsum
                  dolor sit amet consectetur adipisicing elit. Quaerat dolorem
                  in debitis sit corrupti magnam placeat odit nesciunt nobis
                  dicta maxime doloribus iste, harum deserunt deleniti incidunt
                  repudiandae et. Et.
                </Text>

                <Content label={"Description"} value={product?.description} />
                <Content label={"URL"} value={product?.url} clickable={true} />
                <Content
                  label={"Type"}
                  value={
                    product.productType?.charAt(0).toUpperCase() +
                    product.productType?.substr(1)
                  }
                />
              </CardBody>
            </Stack>
          </Center>
        </Card>
      </Box>
    </Center>
  );
};

export default ProductDetails;
