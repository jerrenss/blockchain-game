import React from "react";
import { Container, Grid, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";

const cardData = [
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
];

const renderGameCards = () => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={3}>
      {cardData.map((item, index) => {
        return <GameCard key={index}/>;
      })}
    </Grid>
  );
};

const Game = () => {
  return (
    <Container minH="100vh" maxW="container.sm" pt="80px" pb="32px" 
        display='flex' flexDir='column' justifyContent='center'
    textAlign="center">
      <Text mb='24px' fontSize="2xl" fontWeight={200}>
        Find all matching pairs to collect uniquely minted NFTs!
      </Text>
      {renderGameCards()}
    </Container>
  );
};

export default Game;
