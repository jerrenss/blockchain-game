import React from 'react'
import { Box } from '@chakra-ui/react'
import Navbar from './Navbar'
import Game from './Game'

const Home = () => {
  return (
      <Box bgColor='#e6e6fa' minH='100vh'>
        <Navbar />
        <Game />
      </Box>
  )
}

export default Home
