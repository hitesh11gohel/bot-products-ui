import { Box } from "@chakra-ui/react";
import Products from "../Products";

const Dashboard = () => {
  return (
    <Box h={"86vh"} overflowY={"scroll"} className="scrollbar">
      <Products />
    </Box>
  );
};

export default Dashboard;
