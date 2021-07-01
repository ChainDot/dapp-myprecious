import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import React, { useContext } from "react";
import { Web3Context } from "web3-hooks";
import Main from "./components/Main";

const Dapp = () => {
  const [web3State, login] = useContext(Web3Context);
  const toast = useToast();

  const {
    isOpen: isOpenLogoutModal,
    onOpen: onOpenLogoutModal,
    onClose: onCloseLogoutModal,
  } = useDisclosure();

  const handleLoginClick = () => {
    return !web3State.isLogged ? login() : "";
  };
  return (
    <>
      <Box direction="column" minH="100vh">
        <Modal isOpen={isOpenLogoutModal} onClose={onCloseLogoutModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Logout using Metamask</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Use MetaMask to logout.</Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" onClick={onCloseLogoutModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Box p="2rem" bg="blue.400">
          <Flex justify="space-around">
            <Heading
              size="lg"
              align="center"
              color="blue.900"
              borderWidth="3px"
              borderColor="blue.900"
              p="5"
              borderRadius="7"
            >
              My Precious NFTs
            </Heading>

            {!web3State.isLogged ? (
              <Text mb="5px" color="blue.900" fontWeight="bold">
                You need to login first.
              </Text>
            ) : (
              <Flex direction="column" mx="24px">
                <Text mb="5px" color="blue.900" fontWeight="bold">
                  Account: {web3State.account}
                </Text>
                <Text mb="5px" color="blue.900" fontWeight="bold">
                  Ether Balance: {web3State.balance} ETH
                </Text>
              </Flex>
            )}

            <Button
              colorScheme="blue"
              onClick={() =>
                !web3State.isLogged ? handleLoginClick() : onOpenLogoutModal()
              }
            >
              {!web3State.isLogged ? "Log in" : "Log out"}
            </Button>
          </Flex>
        </Box>

        <Main />
      </Box>
    </>
  );
};

export default Dapp;
