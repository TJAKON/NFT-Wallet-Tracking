import { WagmiConfig, createConfig, mainnet, useNetwork } from 'wagmi'
import { createPublicClient, http } from 'viem'
import Profile from "./Profile";
import axios from "axios";
import "./App.css";
import {React, useState} from "react";
import ActiveChain from './ActiveChain';
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");


const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
})


function App() {
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState("0x1");
  const [cursor, setCursor] = useState(null);
  const [NFTs, setNFTs] = useState([]);


  // function getImgUrl(metadata) {
  //   let meta = JSON.parse(metadata);
  //   if (!meta.image.includes("ipfs://")) {
  //     return meta.image;
  //   } else {
  //     return "https://ipfs.io/ipfs/" + meta.image.substring(7);
  //   }
  // }

  function getImgUrl(metadata) {
    try {
      let meta = JSON.parse(metadata);
      
      if (meta && meta.image) {
        if (!meta.image.includes("ipfs://")) {
          return meta.image;
        } else {
          return "https://ipfs.io/ipfs/" + meta.image.substring(7);
        }
      } else {
        // Handle the case where meta or meta.image is null or undefined
        console.error("Invalid metadata:", metadata);
        return ""; // You can return a default image or an empty string
      }
    } catch (error) {
      console.error("Error parsing metadata:", error);
      return ""; // You can return a default image or an empty string
    }
  }
  

  async function fetchNFTs() {
    let res;
    if (cursor) {
      res = await axios.get(`http://localhost:3000/allNft`, {
        params: { address: address, chain: chain, cursor: cursor },
      });
    } else {
      res = await axios.get(`http://localhost:3000/allNft`, {
        params: { address: address, chain: chain },
      });
    }

    console.log(res.data.result.result);

    let n = NFTs;
    // console.log(n.concat(res.data.result.result))
    setNFTs(n.concat(res.data.result.result));
    setCursor(res.data.result.cursor);
    // console.log(res);
  }

  function addressChange(e) {
    setAddress(e.target.value);
    setCursor(null);
    setNFTs([]);
  }

  function chainChange(e) {
    setChain(e.target.value);
    setCursor(null);
    setNFTs([]);
  }
 
  return (
    <>
      <div className="App">
        <div style={{ fontSize: "23px", fontWeight: "700" }}>
          Get NFTs by contract
        </div>
        <button className="bu" onClick={fetchNFTs}>
          Get NFT's
        </button>
        <div className="inputs">
          <div style={{ display: "flex" }}>
            <div style={{ width: "80px" }}>Contract:</div>
            <input
              className="input"
              value={address}
              onChange={(e) => addressChange(e)}
            ></input>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "80px" }}>Chain:</div>
            <select className="input" onChange={(e) => chainChange(e)}>
              <option value="0x1">Ethereum</option>
              <option value="0x5">Goerli</option>
              <option value="0xaa36a7">Sepolia</option>
              <option value="0x38">Bsc</option>
              <option value="0x89">Polygon</option>
              <option value="0x13881">Polygon testnet mumbai</option>
              <option value="0xa86a">Avalanche</option>
              <option value="0x53A76215">Solana</option>
              <option value="0x1">Aptos</option>
              <option value="mainnet">Aptos mainnet</option>
            </select>
          </div>
        </div>
        {NFTs.length > 0 && (
          <>
            <div className="results">
              {NFTs?.map((e, i) => {
                return (
                  <>
                    <div style={{ width: "70px" }}>
                      <img
                        loading="lazy"
                        width={70}
                        src={getImgUrl(e.metadata)}
                        alt={`${i}image`}
                        style={{ borderRadius: "5px", marginTop: "10px" }}
                      />
                      <div key={i} style={{ fontSize: "10px" }}>
                        {`${e.name}\n${e.token_id}`}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            {cursor && (
              <>
                <button className="bu" onClick={fetchNFTs}>
                  Load More
                </button>
              </>
            )}
          </>
        )}
      </div>

      <WagmiConfig config={config}>
        <Profile/>
        <ActiveChain/>
      </WagmiConfig>
    </>
  );
}

export default App;