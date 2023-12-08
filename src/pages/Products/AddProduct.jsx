/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { FaImage, FaLink } from "react-icons/fa";
import { BsChatRightText } from "react-icons/bs";
import { MdOutlineTitle } from "react-icons/md";
import useProductService from "../../services/useProductService";

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const { addProduct, updateProduct } = useProductService();
  const product = location?.state?.product;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product ? product.name : "",
      description: product ? product.description : "",
      url: product ? product.url : "",
      image: product ? product.image : "",
      productType: product ? product.productType : "",
    },
  });
  const [error, setError] = React.useState(false);
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const user = JSON.parse(localStorage.getItem("loggedIn"));

  const onSubmit = async (cred) => {
    try {
      if (productId) {
        updateProductInfo(productId, cred);
      } else {
        createNewProduct(cred);
      }
    } catch (e) {
      console.log("Error :", e);
    }
  };

  const createNewProduct = async (cred) => {
    const formData = constructFormData(cred);
    const res = await addProduct(formData);
    if (res.status === 201) {
      navigate("/");
    } else {
      setError(true);
    }
  };

  const updateProductInfo = async (id, cred) => {
    const formData = constructFormData(cred);
    const res = await updateProduct(id, formData);
    if (res.status === 200) {
      navigate(`/products/${productId}`);
    } else {
      setError(true);
    }
  };

  const constructFormData = (cred) => {
    const formData = new FormData();
    Object.entries(cred).forEach(([key, value]) => {
      formData.append(key, key === "image" ? value[0] : value);
    });
    formData.append("userId", user.id);
    return formData;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        h={"calc(100vh - 112px)"}
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          width={{ lg: "500px" }}
          flexDirection="column"
          bg={formBackground}
          p={{ md: 12, base: 6 }}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box mb={6}>
            <Heading mb={2}>
              {(productId ? "Update" : "Add") + " Product Here"}
            </Heading>
            {error && (
              <Heading size={"sm"} fontWeight={"medium"} className="errors">
                Something went wrong
              </Heading>
            )}
          </Box>

          <Box mb={6}>
            <InputGroup>
              <InputLeftElement
                color="gray.300"
                fontSize="1.2em"
                children={<MdOutlineTitle />}
              />
              <Input
                name={"name"}
                placeholder={"Test Product"}
                type="text"
                variant="filled"
                className={errors.name ? "input-field" : ""}
                {...register("name", {
                  required: `Please enter name ***`,
                })}
              />
            </InputGroup>
            {errors.name && <p className="errors">{errors.name?.message}</p>}
          </Box>

          <Box mb={6}>
            <InputGroup>
              <InputLeftElement
                color="gray.300"
                fontSize="1.2em"
                children={<BsChatRightText />}
              />
              <Input
                name={"description"}
                placeholder={"Test description"}
                type="text"
                variant="filled"
                className={errors.description ? "input-field" : ""}
                {...register("description", {
                  required: `Please enter description ***`,
                })}
              />
            </InputGroup>
            {errors.description && (
              <p className="errors">{errors.description?.message}</p>
            )}
          </Box>

          <Box mb={6}>
            <InputGroup>
              <InputLeftElement
                color="gray.300"
                fontSize="1.2em"
                children={<FaLink />}
              />
              <Input
                name={"url"}
                placeholder={"https://www.test.com"}
                type="text"
                variant="filled"
                className={errors.url ? "input-field" : ""}
                {...register("url", {
                  required: `Please enter url ***`,
                  pattern: {
                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                    message: "please enter valid url ***",
                  },
                })}
              />
            </InputGroup>
            {errors.url && <p className="errors">{errors.url?.message}</p>}
          </Box>

          <Box mb={6}>
            <InputGroup>
              <InputLeftElement
                color="gray.300"
                fontSize="1.2em"
                children={<FaImage />}
              />
              <Input
                name={"image"}
                type="file"
                variant="filled"
                className={errors.image ? "input-field" : ""}
                {...register("image", {
                  required: `Please choose image ***`,
                })}
              />
            </InputGroup>
            {errors.image && <p className="errors">{errors.image?.message}</p>}
          </Box>

          <Box mb={6}>
            <Select
              name="productType"
              placeholder="Select product type"
              variant="filled"
              className={errors.productType ? "input-field" : ""}
              {...register("productType", {
                required: `Please enter product type ***`,
              })}
            >
              <option value="simple">Simple</option>
              <option value="bundle">Bundle</option>
              <option value="configurable">Configurable</option>
            </Select>
            {errors.productType && (
              <p className="errors">{errors.productType?.message}</p>
            )}
          </Box>

          <Button colorScheme="teal" mb={4} type="submit">
            {(productId ? "Update" : "Add") + " Product"}
          </Button>

          <Text textAlign={"center"} fontSize={"sm"}>
            <Link
              color="teal.500"
              as={ReactRouterLink}
              to={productId ? `/products/${productId}` : "/"}
            >
              Back to Products
            </Link>
          </Text>
        </Flex>
      </Flex>
    </form>
  );
};

export default AddProduct;
