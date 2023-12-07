import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Header from "./components/Header";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Footer from "./components/Footer";
import Protected from "./pages/Auth/Protected";
import NotFound from "./pages/NotFound/NotFound";
import UserTable from "./components/UserTable";
import ProductDetails from "./pages/Products/ProductDetails";
import AddProduct from "./pages/Products/AddProduct";

function App() {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Protected Component={Dashboard} />} />
        <Route path="/users" element={<Protected Component={UserTable} />} />
        <Route
          path="/products/:productId"
          element={<Protected Component={ProductDetails} />}
        />
        <Route path="/products/:productId/update" element={<AddProduct />} />
        <Route
          path="/users/:id/:action"
          element={<Protected Component={Register} />}
        />
        <Route path="/user/add" element={<Register />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
