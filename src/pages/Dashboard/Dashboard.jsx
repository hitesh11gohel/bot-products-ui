import { Box } from "@chakra-ui/react";
import ProductList from "../Products";

const Dashboard = () => {
  return (
    <Box h={"calc(100vh - 112px)"} overflowY={"scroll"} className="scrollbar">
      <ProductList />
    </Box>
  );
};

export default Dashboard;
