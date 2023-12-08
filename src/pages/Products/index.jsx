/* eslint-disable react/prop-types */
import React from "react";
import useProductService from "../../services/useProductService";
import { Box, Center, SimpleGrid, Text } from "@chakra-ui/react";
import Loader from "../../components/Loader";
import PageActions from "../../components/PageActions";
import ProductCard from "../../components/ProductCard";
import PaginationComp from "../../components/PaginationComp";

const ProductList = () => {
  const { getAllProducts } = useProductService();
  const [products, setProducts] = React.useState(null);
  const [page, setPage] = React.useState({
    total: 1,
    current: 1,
    limit: 5,
    products: 0,
  });

  const getProducts = async () => {
    const res = await getAllProducts();

    if (res.status === 200) {
      setProducts(res.data.data);
      setPage({
        current: res.data.currentPage,
        total: res.data.totalPage,
        limit: res.data.limit,
        products: res.data.total,
      });
    } else if (res.response.status === 401) {
      localStorage.clear();
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
        <PaginationComp values={page} handleValues={setPage} />
      </Box>
    </Center>
  );
};

export default ProductList;
