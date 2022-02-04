import React from "react";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <>
      <Box
        bgColor="#663399"
        opacity="100%"
        px={4}
        position="fixed"
        zIndex={1}
        width="100%"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack
            spacing={8}
            width="100%"
            display="flex"
            justifyContent={"space-between"}
          >
            <Box display="flex" alignItems="center">
              <Image height="32px" src="logo-64.png" alt="Logo" />
              <Text color="#FFFFFF" ml="8px" fontWeight={600}>
                Elephant
              </Text>
            </Box>
            <HStack as={"nav"} spacing={4}>
              <Text color="#FFFFFF" fontWeight={600}>
                Wallet
              </Text>
            </HStack>
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
