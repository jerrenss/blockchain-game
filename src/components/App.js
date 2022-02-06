import React, { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Web3 from "web3";
import Home from "./Home";

const App = () => {
  useEffect(() => {
    setupWeb3();
  }, []);

  useEffect(() => {
    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.reload();
    });
  }, []);

  const setupWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You will need to install MetaMask in your browser before using this app!"
      );
      window.location.replace("https://metamask.io/download/");
    }
  };

  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
};

export default App;
