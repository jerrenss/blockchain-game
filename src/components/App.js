import * as React from 'react'

import { ChakraProvider, Text } from '@chakra-ui/react'
import Navbar from './Navbar'

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Text>Hello</Text>
    </ChakraProvider>
  )
}

export default App
