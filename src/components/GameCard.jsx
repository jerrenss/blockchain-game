import React from "react";
import { GridItem } from "@chakra-ui/react";

const GameCard = (props) => {
  const { idx, id, state, onClickCard } = props;

  const renderCard = () => {
    if (state === 0) {
      return (
        <GridItem
          w="100%"
          h="0"
          pt="100%"
          bg="blue.500"
          borderRadius="8px"
          cursor="pointer"
          onClick={() => onClickCard(idx, id)}
        />
      );
    } else if (state === 1) {
      return (
        <GridItem
          w="100%"
          h="0"
          pt="100%"
          bgImage={`/card/e${id}.png`}
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          backgroundSize="contain"
          borderRadius="8px"
        />
      );
    }
  };

  return <>{renderCard()}</>;
};

export default GameCard;
