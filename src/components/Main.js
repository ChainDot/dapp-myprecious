import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useToast } from "@chakra-ui/toast";
import React, { useContext, useState } from "react";
import { Web3Context } from "web3-hooks";
import { MypreciousContext } from "../App";
import { ethers } from "ethers";

const Main = () => {
  const [web3State] = useContext(Web3Context);
  const [precious, setPrecious] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [textArea, setTextArea] = useState("");
  const [url, setUrl] = useState("");
  const nft = useContext(MypreciousContext);
  const toast = useToast();

  const handleTextOnChange = (event) => {
    setTextArea(event.target.value);
  };

  const handleURLOnChange = (event) => {
    setUrl(event.target.value);
  };

  const handlePreciousClick = async () => {
    try {
      setIsLoading(true);
      let tx = await nft.newPrecious(ethers.utils.id(textArea), url);
      await tx.wait();
      toast({
        title: "Confirmed transaction",
        description: `Address ${web3State.account} \nTransaction hash: ${tx.hash}`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setPrecious(tx);
    } catch (e) {
      toast({
        title: "Transaction signature denied",
        description: e.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box margin="10">
        <Flex
          direction="column"
          align="center"
          justify="center"
          mt="1.5rem"
          borderWidth="2px"
          p="3"
          borderColor="blue.400"
          borderRadius="10"
          margin="10"
        >
          <Text fontSize="1.25rem" m="1rem" color="blue.600" fontWeight="bold">
            Create your NFT
          </Text>
          <Textarea
            placeholder="Enter your text here"
            m="1rem"
            size="lg"
            onChange={handleTextOnChange}
          />
          <Textarea
            placeholder="Enter your URL here"
            m="1rem"
            size="lg"
            onChange={handleURLOnChange}
          />
          <Button mb="8px" colorScheme="blue" onClick={handlePreciousClick}>
            Send
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default Main;
