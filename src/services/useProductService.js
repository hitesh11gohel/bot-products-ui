import Axios from "axios";

const useProductService = () => {
  const user = JSON.parse(localStorage.getItem("loggedIn"));
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const headerObj = {
    "Access-Control-Allow-Headers": "x-access-token",
    "x-access-token": user?.token ?? "",
  };

  const getAllProducts = async (withQueryParams = false, operation, value) => {
    const query = withQueryParams
      ? `${BASE_URL}/api/products/get-all?${operation}=${value}`
      : `${BASE_URL}/api/products/get-all`;
    try {
      const products = await Axios({
        url: query,
        method: "GET",
        headers: headerObj,
      });
      return products;
    } catch (error) {
      return error;
    }
  };

  const getProduct = async (productId) => {
    try {
      const product = await Axios({
        url: `${BASE_URL}/api/products/get/${productId}`,
        method: "GET",
        headers: headerObj,
      });
      return product;
    } catch (error) {
      return error;
    }
  };

  const addProduct = async (cred) => {
    try {
      const product = await Axios({
        url: `${BASE_URL}/api/products/create`,
        method: "POST",
        headers: headerObj,
        data: cred,
      });
      return product;
    } catch (error) {
      return error;
    }
  };

  const updateProduct = async (productId, cred) => {
    try {
      const product = await Axios({
        url: `${BASE_URL}/api/products/update/${productId}`,
        method: "PATCH",
        headers: headerObj,
        data: cred,
      });
      return product;
    } catch (error) {
      return error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const product = await Axios({
        url: `${BASE_URL}/api/products/delete/${productId}`,
        method: "DELETE",
        headers: headerObj,
      });
      return product;
    } catch (error) {
      return error;
    }
  };

  return {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProductService;
