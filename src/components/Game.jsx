import React, { useState, useEffect } from "react";
import { Container, Grid, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import Web3 from 'web3'
import GameCard from "./GameCard";
import ElephantToken from '../abis/ElephantToken.json'

const templateCardData = [
  {
    id: 1,
    state: 0,
  },
  {
    id: 1,
    state: 0,
  },
  {
    id: 2,
    state: 0,
  },
  {
    id: 2,
    state: 0,
  },
  {
    id: 3,
    state: 0,
  },
  {
    id: 3,
    state: 0,
  },
  {
    id: 4,
    state: 0,
  },
  {
    id: 4,
    state: 0,
  },
  {
    id: 5,
    state: 0,
  },
  {
    id: 5,
    state: 0,
  },
  {
    id: 6,
    state: 0,
  },
  {
    id: 6,
    state: 0,
  },
  {
    id: 7,
    state: 0,
  },
  {
    id: 7,
    state: 0,
  },
  {
    id: 8,
    state: 0,
  },
  {
    id: 8,
    state: 0,
  },
];

// Durstenfeld shuffle algorithm
const shuffleArray = (array) => {
  const clonedArr = [...array];
  for (var i = clonedArr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = clonedArr[i];
    clonedArr[i] = clonedArr[j];
    clonedArr[j] = temp;
  }
  return clonedArr;
};

const Game = () => {
  const [cardData, setCardData] = useState(shuffleArray(templateCardData));
  const [prevCard, setPrevCard] = useState({});
  const [turn, setTurn] = useState(0);
  const [count, setCount] = useState(0);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState({});
  const [tokenURIs, setTokenURIs] = useState([]);
  const toast = useToast();

  useEffect(() => {
    loadBlockchainData()
  }, []);
  
  const loadBlockchainData = async () => {
    const web3 = new Web3(window.web3.currentProvider)
    const accounts = await web3.eth.requestAccounts()
    setAccount(accounts[0]);

    // Load smart contract
    const networkId = await web3.eth.net.getId()
    const networkData = ElephantToken.networks[networkId]
    if(networkData) {
        const abi = ElephantToken.abi
        const address = networkData.address
        const contract = new web3.eth.Contract(abi, address)
        setContract(contract)
        const balanceOf = await contract.methods.balanceOf(accounts[0]).call()
        for (let i = 0; i < balanceOf.toNumber(); i++) {
            const id = await contract.methods.tokenOfOwnerByIndex(accounts[0], i).call()
            const tokenURI = await contract.methods.tokenURI(id).call()
            setTokenURIs([...tokenURIs, tokenURI])
        }
    } else {
        alert('Smart contract not deployed to detected network.')
    }
  }


  const renderGameCards = () => {
    return (
      <Grid templateColumns="repeat(4, 1fr)" gap={3}>
        {cardData.map((item, index) => {
          return (
            <GameCard
              key={index}
              idx={index}
              id={item.id}
              onClickCard={onClickCard}
              state={item.state}
            />
          );
        })}
      </Grid>
    );
  };

  const flipCard = (idx) => {
    const updatedCardData = [...cardData];
    updatedCardData[idx].state = updatedCardData[idx].state === 0 ? 1 : 0;
    setCardData(updatedCardData);
  };

  // Game logic handler
  const onClickCard = async (idx, id) => {
    flipCard(idx);

    if (turn === 0) {
      setPrevCard({ idx, id });
      setTurn(turn + 1);
    } else {
      if (id === prevCard.id) {
        if (count + 1 === 2) {
          toast({
            title: "Congratulations!",
            status: "success",
            position: "top",
            duration: 2000,
            isClosable: true,
          });
          const totalSupply = await contract.methods.totalSupply().call()
          const newTokenURI = `https://avatars.dicebear.com/api/big-ears/elephant-${totalSupply.toNumber() + 1}.svg`
          contract.methods.mint(
            account, newTokenURI
          )
          .send({ from: account })
          .on('transactionHash', (hash) => {
              setTokenURIs([...tokenURIs, newTokenURI])
          })
        }
        setCount(count + 1);
        setTurn(0);
        setPrevCard({});
      } else {
        setTimeout(function () {
          flipCard(idx);
          flipCard(prevCard.idx);
        }, 500);
      }
      setTurn(0);
      setPrevCard({});
    }
  };

  return (
    <Container
      minH="100vh"
      maxW="container.sm"
      pt="80px"
      pb="32px"
      display="flex"
      flexDir="column"
      justifyContent="center"
      textAlign="center"
    >
      <Text mb="24px" fontSize="2xl" fontWeight={200}>
        Find all matching pairs to collect uniquely minted NFTs!
      </Text>
      {renderGameCards()}
      <Text mt="24px" mb="24px" fontSize="2xl" fontWeight={200}>
        Currently owned Elephant NFTs
      </Text>
      {tokenURIs.length > 0 ? <Text>Have</Text> : <Text>None</Text>}
    </Container>
  );
};

export default Game;
