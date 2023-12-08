/* eslint-disable react/no-children-prop */
import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorModeValue,
  Link,
  Text,
  Box,
  Spinner,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import useAuthService from "../../services/useAuthService";
import { FaImage, FaRegUserCircle } from "react-icons/fa";
import { LiaIndustrySolid } from "react-icons/lia";
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import "./Common.scss";

const Registration = () => {
  const navigate = useNavigate();
  const { signUp } = useAuthService();
  const [isEnable, setEnable] = useState({
    password: true,
    confirmPassword: true,
  });
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [loading, setLoading] = useState(false);

  const createNewUser = async (cred) => {
    const formData = new FormData();
    Object.entries(cred).forEach(([key, value]) => {
      formData.append(key, key === "profile" ? value[0] : value);
    });
    const res = await signUp(formData);
    if (res.status === 201) {
      Reset();
    } else {
      setError(true);
    }
  };

  const Reset = () => {
    reset();
    navigate("/");
  };

  const onSubmit = async (cred) => {
    setLoading(true);
    try {
      createNewUser(cred);

      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex h="calc(100vh - 50px)" alignItems="center" justifyContent="center">
        <Flex
          width={{ lg: "500px" }}
          flexDirection="column"
          bg={formBackground}
          p={{ md: 12, base: 6 }}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box mb={6}>
            <Heading mb={2}>{"Register Here"}</Heading>
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
                children={<FaRegUserCircle />}
              />
              <Input
                name="firstName"
                placeholder="Hitesh"
                type="text"
                variant="filled"
                disabled={loading}
                className={errors.firstName ? "input-field" : ""}
                {...register("firstName", {
                  required: "Please enter first name ***",
                })}
              />
            </InputGroup>
            {errors.firstName && (
              <p className="errors">{errors.firstName?.message}</p>
            )}
          </Box>

          <Box mb={6}>
            <InputGroup>
              <InputLeftElement
                color="gray.300"
                fontSize="1.2em"
                children={<FaRegUserCircle />}
              />
              <Input
                name="lastName"
                placeholder="Gohel"
                type="text"
                variant="filled"
                disabled={loading}
                className={errors.lastName ? "input-field" : ""}
                {...register("lastName", {
                  required: "Please enter last name ***",
                })}
              />
            </InputGroup>
            {errors.lastName && (
              <p className="errors">{errors.lastName?.message}</p>
            )}
          </Box>

          <Box mb={6}>
            <InputGroup>
              <InputLeftElement
                color="gray.300"
                fontSize="1.2em"
                children={<AiOutlineMail />}
              />
              <Input
                name="email"
                placeholder="test@gmail.com"
                type="email"
                variant="filled"
                className={errors.email ? "input-field" : ""}
                disabled={loading}
                {...register("email", {
                  required: "Please enter email ***",
                  maxLength: 80,
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
            </InputGroup>
            {errors.email && <p className="errors">{errors.email?.message}</p>}
          </Box>

          <Box mb={6}>
            <InputGroup>
              <InputLeftElement
                color="gray.300"
                fontSize="1.2em"
                children={<LiaIndustrySolid />}
              />
              <Input
                name="companyName"
                placeholder="Coachbar.io"
                type="text"
                variant="filled"
                disabled={loading}
                className={errors.companyName ? "input-field" : ""}
                {...register("companyName", {
                  required: "Please enter company name ***",
                })}
              />
            </InputGroup>
            {errors.companyName && (
              <p className="errors">{errors.companyName?.message}</p>
            )}
          </Box>

          <Box mb={6}>
            <InputGroup>
              <InputLeftElement
                color="gray.300"
                fontSize="1.2em"
                children={<FaImage />}
              />
              <Input
                name={"profile"}
                type="file"
                variant="filled"
                className={errors.profile ? "input-field" : ""}
                {...register("profile", {
                  required: `Please choose profile ***`,
                })}
              />
            </InputGroup>
            {errors.profile && (
              <p className="errors">{errors.profile?.message}</p>
            )}
          </Box>

          <Box mb={6}>
            <InputGroup>
              <InputLeftElement
                color="gray.300"
                fontSize="1.2em"
                onClick={() =>
                  setEnable({ ...isEnable, password: !isEnable.password })
                }
                sx={{ cursor: "pointer" }}
                children={
                  isEnable.password ? <AiFillEye /> : <AiFillEyeInvisible />
                }
              />
              <Input
                name="password"
                placeholder="**********"
                type={isEnable.password ? "password" : "text"}
                variant="filled"
                className={errors.password ? "input-field" : ""}
                disabled={loading}
                {...register("password", {
                  required: "Please enter password ***",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
            </InputGroup>
            {errors.password && (
              <p className="errors">{errors.password?.message}</p>
            )}
          </Box>

          <Box mb={6}>
            <InputGroup>
              <InputLeftElement
                color="gray.300"
                fontSize="1.2em"
                onClick={() =>
                  setEnable({
                    ...isEnable,
                    confirmPassword: !isEnable.confirmPassword,
                  })
                }
                sx={{ cursor: "pointer" }}
                children={
                  isEnable.confirmPassword ? (
                    <AiFillEye />
                  ) : (
                    <AiFillEyeInvisible />
                  )
                }
              />
              <Input
                name="confirmPassword"
                placeholder="**********"
                type={isEnable.confirmPassword ? "password" : "text"}
                variant="filled"
                className={errors.confirmPassword ? "input-field" : ""}
                disabled={loading}
                {...register("confirmPassword", {
                  required: "Please confirm your password ***",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
            </InputGroup>
            {errors.confirmPassword && (
              <p className="errors">{errors.confirmPassword?.message}</p>
            )}
          </Box>

          <Button
            colorScheme={loading ? "gray" : "teal"}
            mb={4}
            type="submit"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Sign up"}
          </Button>

          <Text textAlign={"center"} fontSize={"sm"}>
            Have an account ?{" "}
            <Link color="teal.500" as={ReactRouterLink} to="/signin">
              Log in
            </Link>
          </Text>
        </Flex>
      </Flex>
    </form>
  );
};

export default Registration;
