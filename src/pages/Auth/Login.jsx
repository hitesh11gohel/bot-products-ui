/* eslint-disable react/no-children-prop */
import { useEffect, useState } from "react";
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
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuthService from "../../services/useAuthService";
import "./Common.scss";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuthService();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isEnablePassword, setEnablePassword] = useState(true);
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const onSubmit = async (cred) => {
    setLoading(true);
    const res = await signIn(cred);
    if (res.status !== 200) {
      setLoading(false);
      setError(true);
    } else {
      setError(false);
      setLoading(false);
      reset();
      navigate("/");
      setLoading(false);
      localStorage.setItem("loggedIn", JSON.stringify(res.data.user));
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <Flex h="97vh" alignItems="center" justifyContent="center">
        <Flex
          width={{ lg: "500px" }}
          flexDirection="column"
          bg={formBackground}
          p={{ md: 12, base: 6 }}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box mb={6}>
            <Heading mb={2}>Log In</Heading>
            {error && (
              <Heading size={"sm"} fontWeight={"medium"} className="errors">
                Invalid Credentials
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
                name="email"
                placeholder="test@gmail.com"
                type="email"
                variant="filled"
                className={errors.email ? "input-field" : ""}
                {...register("email", {
                  required: "Please enter your email ***",
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
                onClick={() => setEnablePassword(!isEnablePassword)}
                sx={{ cursor: "pointer" }}
                children={
                  isEnablePassword ? <AiFillEye /> : <AiFillEyeInvisible />
                }
              />
              <Input
                name="password"
                placeholder="**********"
                type={isEnablePassword ? "password" : "text"}
                variant="filled"
                className={errors.password ? "input-field" : ""}
                {...register("password", {
                  required: "Please enter your password ***",
                })}
              />
            </InputGroup>
            {errors.password && (
              <p className="errors">{errors.password?.message}</p>
            )}
          </Box>

          <Button
            colorScheme={loading ? "gray" : "teal"}
            mb={4}
            type="submit"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Log In"}
          </Button>

          <Text textAlign={"center"} fontSize={"sm"}>
            {"Don't have an account ? "}
            <Link color="teal.500" as={ReactRouterLink} to="/signup">
              Sign up
            </Link>
          </Text>
        </Flex>
      </Flex>
    </form>
  );
};

export default Login;
