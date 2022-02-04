import React, { useState } from "react";
import { GridItem } from "@chakra-ui/react";

const GameCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen ? (
        <GridItem
          w="100%"
          h="0"
          pt="100%"
          bgImage="card-placeholder.png"
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          backgroundSize="contain"
          borderRadius="8px"
          cursor="pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      ) : (
        <GridItem
          w="100%"
          h="0"
          pt="100%"
          bg="blue.500"
          borderRadius="8px"
          cursor="pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      )}
    </>
  );
};

export default GameCard;
