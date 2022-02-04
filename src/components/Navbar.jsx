import React, { useEffect, useState } from "react";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import Web3 from 'web3'

const Navbar = () => {
  const [account, setAccount] = useState('')

  useEffect(() => {
    getAccount()
  }, []);

  const getAccount = async () => {
    const web3 = new Web3(window.web3.currentProvider)
    const accounts = await web3.eth.requestAccounts()
    setAccount(accounts[0]);
  }

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
                {account}
              </Text>
            </HStack>
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
