// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { View, Text, Pressable, Button, TextInput, Image, StyleSheet } from 'react-native';
// import {Picker} from '@react-native-picker/picker'
// import {
//   WalletConnectModal,
//   useWalletConnectModal,
// } from '@walletconnect/modal-react-native';

// React native and wagmi configuration

import '@walletconnect/react-native-compat';
import { WagmiConfig } from 'wagmi'
import { mainnet, polygon, arbitrum } from 'viem/chains'
import { createWeb3Modal, defaultWagmiConfig, Web3Modal } from '@web3modal/wagmi-react-native'

const projectId = 'cdb9a60a993e763524a7dcff53fd9a13';

const metadata = {
  name: 'Web3Modal RN',
  description: 'Web3Modal RN Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'YOUR_APP_SCHEME://', // Replace with your app's custom URL scheme
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

const chains = [mainnet, polygon, arbitrum]

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig
})

// const chains = [
//   {label: 'Ethereum', value: '0x1'},
//   { label: 'Bsc', value: '0x38' },
//   { label: 'Polygon', value: '0x89' },
//   { label: 'Avalanche', value: '0xa86a' },
// ];

export default function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [chain, setChain] = useState('0x1');
  const [cursor, setCursor] = useState(null);
  const [NFTs, setNFTs] = useState([]);
  const { isOpen, open, close, isConnected, address, provider } = useWalletConnectModal();

  // const handleConnect = async () => {
  //   try {
  //     if (!isConnected) {
  //       await open();
  //     } else {
  //       // Handle disconnection if already connected
  //       await provider?.disconnect();
  //     }
  //   } catch (error) {
  //     console.error('Error connecting wallet:', error);
  //   }
  // };

  const handleConnect = async () => {
    try {
      if (!isConnected) {
        await open();
      } else {
        // Handle disconnection if already connected
        await provider?.disconnect();
        setWalletAddress(''); // Clear the stored wallet address on disconnection
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  useEffect(() => {
    // Automatically set the wallet address when connected
    if (isConnected && address) {
      setWalletAddress(address);
    }
  }, [isConnected, address]);


  // function getImgUrl(metadata) {
  //   let meta = JSON.parse(metadata);

  //   if (!meta.image.includes('ipfs://')) {
  //     return meta.image;
  //   } else {
  //     return 'https://ipfs.io/ipfs/' + meta.image.substring(7);
  //   }
  // }

  // async function fetchNFTs() {
  //   try {
  //     let res;
  //     if (cursor) {
  //       res = await axios.get(`http://localhost:3000/allNft`, {
  //         params: { address: address, chain: chain, cursor: cursor },
  //       });
  //     } else {
  //       res = await axios.get(`http://localhost:3000/allNft`, {
  //         params: { address: address, chain: chain },
  //       });
  //     }

  //     let n = NFTs;
  //     setNFTs(n.concat(res.data.result.result));
  //     setCursor(res.data.result.cursor);
  //   } catch (error) {
  //     console.error('Error fetching NFTs:', error);
  //   }
  // }

  // async function fetchNFTs() {
  //   try {
  //     console.log("Before Axios request");
  //     let res;
  //     console.log(walletAddress, chain)

  //     const postData = {
  //       address: walletAddress,
  //       chain: chain,
  //     };

  //     // res = await axios.post(`http://localhost:3000/allNft`, {
  //     //     params: { address: walletAddress, chain: chain, cursor: cursor },})

  //     axios.post(`http://localhost:3000/allNft`, postData).then((response) => {
  //       console.log(response.data)
  //     }).catch((error) => {
  //       console.log('Error fetching nfts', error)
  //     })
  //     // if (cursor) {
  //     //   res = await axios.get(`http://localhost:3000/allNft`, {
  //     //     params: { address: walletAddress, chain: chain, cursor: cursor },
  //     //   });
  //     // } else {
  //     //   res = await axios.get(`http://localhost:3000/allNft`, {
  //     //     params: { address: walletAddress, chain: chain },
  //     //   });
  //     // }
  
  //     console.log("After Axios request", res.data);
  
  //     let n = NFTs;
  //     setNFTs(n.concat(res.data.result.result));
  //     setCursor(res.data.result.cursor);
  //   } catch (error) {
  //     console.error("Error fetching NFTs:", error);
  //   }
  // }

  // async function fetchNFTs() {
  //   try {
  //     console.log("Before Axios request");
  //     let res;
  //     console.log(walletAddress, chain);

  //     console.log(res)
  //     if (cursor) {
  //       res = await axios.get(`http://localhost:3000/allNft`, {
  //         params: { address: walletAddress, chain: chain, cursor: cursor },
  //       });
  //     } else {
  //       res = await axios.get(`http://localhost:3000/allNft`, {
  //         params: { address: walletAddress, chain: chain },
  //       });
  //     }
  
  //     console.log("After Axios request", res);
  
  //     if (res && res.data) {
  //       let n = NFTs;
  //       setNFTs(n.concat(res.data.result.result));
  //       setCursor(res.data.result.cursor);
  //     } else {
  //       console.error("Unexpected response format:", res);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching NFTs:", error);
  //   }
  // }
  
  

  // function addressChange(text) {
  //   setWalletAddress(text);
  //   setCursor(null);
  //   setNFTs([]);
  // }

  // const handleChain = (value)=>{
  //   setChain(value);
  // }

  // function chainChange(value) {
  //   setChain(value);
  //   setCursor(null);
  //   setNFTs([]);
  // }

  return (
    <>
      {/* <View style={styles.container}>
        <Text style={styles.heading}>WalletConnect</Text>
        <Pressable onPress={handleConnect} style={styles.connectButton}>
          <Text>{isConnected ? address : 'Connect'}</Text>
        </Pressable>

        <WalletConnectModal projectId={projectId} providerMetadata={metadata} />
      </View> */}

      {/* <View style={styles.container}>
        <Text style={styles.heading}>WalletConnect</Text>
        <Pressable onPress={handleConnect} style={styles.connectButton}>
          <Text>{isConnected ? address : 'Connect'}</Text>
        </Pressable>

        <WalletConnectModal projectId={projectId} providerMetadata={metadata} />
      </View> */}

      <WagmiConfig config={wagmiConfig}>
        <Web3Modal />
      </WagmiConfig>


      {/* <View style={styles.nftContainer}>
        <Text style={styles.nftHeading}>Get NFTs by contract</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Contract:</Text>
            <TextInput
              style={styles.input}
              value={walletAddress}
              onChangeText={(text) => addressChange(text)}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Chain:</Text>
            <TextInput
              style={styles.input}
              value={chain}
              onChangeText={(value) => chainChange(value)}
            />

            <Picker
            style={styles.picker}
            selectedValue={chain}
            onValueChange={(value) => setChain(value)}
            >
            {chains.map((chain) => {
              <Picker.Item 
              key={chain.value}
              label={chain.label}
              value={chain.value}
              />
            })}
            </Picker>
          </View>


          <View style={styles.inputRow}>
            <Text style={styles.label}>Chain:</Text>
            <Picker
              style={styles.picker}
              selectedValue={chain}
              onValueChange={(value) => setChain(value)}
            >
              {chains.map((chain) => (
                <Picker.Item key={chain.value} label={chain.label} value={chain.value} />
              ))}
            </Picker>
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Chain:</Text>
            <Picker
              style={styles.picker}
              selectedValue={chain}
              onValueChange={(value) => handleChain(value)}
            >
              <Picker.Item label="Ethereum" value="0x1" />
              <Picker.Item label="Bsc" value="0x38" />
              <Picker.Item label="Polygon" value="0x89" />
              <Picker.Item label="Avalanche" value="0xa86a" />
            </Picker>
          </View>
        <Button title="Get NFTs" onPress={fetchNFTs} />


          
        </View>
        {NFTs.length > 0 && (
          <View style={styles.resultsContainer}>
            <View style={styles.resultRow}>
              {NFTs?.map((e, i) => (
                <View key={i} style={styles.resultItem}>
                  <Image
                    source={{ uri: getImgUrl(e.metadata) }}
                    style={styles.resultImage}
                  />
                  <Text style={styles.resultText}>{`${e.name}\n${e.token_id}`}</Text>
                </View>
              ))}
            </View>
            {cursor && <Button title="Load More" onPress={fetchNFTs} />}
          </View>
        )}
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  connectButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
    alignItems: 'center',
  },
  nftContainer: {
    margin: 20,
  },
  nftHeading: {
    fontSize: 23,
    fontWeight: '700',
  },
  inputContainer: {
    marginVertical: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 80,
  },
  input: {
    borderWidth: 1,
    flex: 1,
    padding: 5,
  },
  resultsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resultRow: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resultItem: {
    width: 70,
    margin: 5,
    alignItems: 'center',
  },
  resultImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginTop: 10,
  },
  resultText: {
    fontSize: 10,
  },
  picker: {
    flex: 1,
    height: 40,
  },
});

export { App };


