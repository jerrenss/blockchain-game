import React,  { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Web3 from 'web3'
import Home from './Home'

const App = () => {
  useEffect(() => {
    setupWeb3()
  }, []);
  
  const setupWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  )
}

export default App
