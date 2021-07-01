import React, { createContext } from "react";
import Dapp from "./Dapp";
import { MypreciousAddress, MypreciousAbi } from "./contracts/Myprecious";
import { useContract } from "web3-hooks";

export const MypreciousContext = createContext(null);

const App = () => {
  const myprecious = useContract(MypreciousAddress, MypreciousAbi);
  return (
    <MypreciousContext.Provider value={myprecious}>
      <Dapp />
    </MypreciousContext.Provider>
  );
};

export default App;
