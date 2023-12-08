/* eslint-disable react/prop-types */
import { Flex, IconButton, Select, Text, Tooltip } from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

const PaginationComp = ({ values, handleValues }) => {
  const { current, total, limit } = values;
  const canPreviousPage = current > 1;

  const handlePagination = async (operation, value) => {
    console.log(`${operation} : ${value}`);
    const key = operation === "page" ? "current" : "limit";
    handleValues({ ...values, [key]: Number(value) });
  };

  return (
    <Flex justify="space-between" m={4} align="center">
      <Flex gap="4">
        <Tooltip label="First Page">
          <IconButton
            onClick={() => handlePagination("page", 1)}
            isDisabled={!canPreviousPage}
            icon={<ArrowLeftIcon h="3" w="3" />}
          />
        </Tooltip>
        <Tooltip label="Prev Page">
          <IconButton
            onClick={() => handlePagination("page", current - 1)}
            isDisabled={!canPreviousPage}
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

        <Select
          w="32"
          value={limit}
          onChange={(e) => handlePagination("limit", Number(e.target.value))}
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
            onClick={() => handlePagination("page", current + 1)}
            icon={<ChevronRightIcon h="6" w="6" />}
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            onClick={() => handlePagination("page", total)}
            icon={<ArrowRightIcon h="3" w="3" />}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default PaginationComp;
