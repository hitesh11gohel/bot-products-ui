/* eslint-disable react/prop-types */
import React from "react";
import useProductService from "../../services/useProductService";
import {
  Box,
  Center,
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Loader from "../../components/Loader";
import PageActions from "../../components/PageActions";
import ProductCard from "../../components/ProductCard";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

const Products = () => {
  const { getAllProducts } = useProductService();
  const [products, setProducts] = React.useState(null);
  const [page, setPage] = React.useState({
    total: 1,
    current: 1,
    limit: 5,
  });

  const getProducts = async () => {
    const res = await getAllProducts();
    if (res.status === 200) {
      setProducts(res.data.data);
      console.log("res.data.data :", res.data);
      setPage({
        current: res.data.currentPage,
        total: res.data.totalPage,
        limit: res.data.limit,
      });
    }
  };

  React.useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!products) {
    return <Loader />;
  }

  return (
    <Center>
      <Box w={{ base: "100vw", lg: "90%" }}>
        <Box m={4}>
          <PageActions />
        </Box>
        <Center m={4}>
          {products ? (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
              spacingX="40px"
              spacingY="20px"
            >
              {products.map((product) => (
                <ProductCard key={product._id} cardInfo={product} />
              ))}
            </SimpleGrid>
          ) : (
            <Center h={"84vh"}>
              <Text fontSize={"3xl"}>No Products Available</Text>
            </Center>
          )}
        </Center>
        <PaginationContainer values={page} handleValues={setPage} />
      </Box>
    </Center>
  );
};

export default Products;

const PaginationContainer = ({ values, handleValues }) => {
  const { current, total, limit } = values;
  console.log("==> values :", values);

  return (
    <Flex justify="space-between" m={4} align="center">
      <Flex gap="4">
        <Tooltip label="First Page">
          <IconButton
            // onClick={() => gotoPage(0)}
            // isDisabled={!canPreviousPage}
            icon={<ArrowLeftIcon h="3" w="3" />}
          />
        </Tooltip>
        <Tooltip label="Prev Page">
          <IconButton
            // onClick={() => gotoPage(pageIndex - 1)}
            // isDisabled={!canPreviousPage}
            icon={<ChevronLeftIcon h="6" w="6" fontSize="xl" />}
          />
        </Tooltip>
      </Flex>

      <Flex align="center" gap={4}>
        <Flex align="center" gap="2">
          Page{" "}
          <Text fontWeight="bold" as="span">
            {" "}
            {current}
          </Text>
          of
          <Text fontWeight="bold" as="span">
            {" "}
            {total}
          </Text>
        </Flex>

        <Flex align="center" gap={4}>
          Goto Page{" "}
          <NumberInput
            w={28}
            min={1}
            // max={pageOptions.length}
            // onChange={(value) => {
            //   const page = value ? value - 1 : 0;
            //   gotoPage(page);
            // }}
            defaultValue={current}
            // defaultValue={pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>

        <Select
          w="32"
          value={limit}
          onChange={(e) =>
            handleValues({ ...values, limit: Number(e.target.value) })
          }
        >
          {[5, 10, 20, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Flex>

      <Flex gap="4">
        <Tooltip label="Next Page">
          <IconButton
            // onClick={nextPage}
            icon={<ChevronRightIcon h="6" w="6" />}
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            // onClick={() => handlePagination(pageCount - 1)}
            icon={<ArrowRightIcon h="3" w="3" />}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
