const express = require("express")
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const app = express();
const cors = require("cors")
const port = 3000;
require('dotenv').config({path: ".env" });


app.use(cors());
app.use(express.json());

const Moralis_Api_Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjcyNDFlZDcxLTA4MjQtNGE3NC04MzVkLWFmOTA2NjYzZDRhYyIsIm9yZ0lkIjoiMzY2MTIxIiwidXNlcklkIjoiMzc2Mjc0IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiJiYThkYjhiNS05MjMzLTQzNTktYTU3Zi02NjIwNjZlN2Q5MzciLCJpYXQiOjE3MDExNjgxMzgsImV4cCI6NDg1NjkyODEzOH0.72ws8olO7sHl5idjE0n3oeK4Es9WSuCtvCqupRTeL0M"
// console.log(Moralis_Api_Key)

// // 0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb  test
// //   0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB
// // 0xe1B4A86c252CA3b655061ea391B59b97Cb25fd44
// // 0xEc5bA34a64BCa71D1fE72c62Af3E7e3Ad015FD2d
// // 0x691835ed7d3f6f2Fc28f1f3401fFbef2Ecaa91e1

app.get("/allNft", async(req, res) => {
    try{
        const { query } = req;
        const address = query.address
        const chain = query.chain

        let NFTs;
        console.log(query.address , query.chain)

        if(query.cursor){
            NFTs = await Moralis.EvmApi.nft.getWalletNFTs({
                address,
                chain
            });
        }else{
            NFTs = await Moralis.EvmApi.nft.getWalletNFTs({
                address,
                chain
            })
        }
        
        // NFTs = await Moralis.EvmApi.nft.getWalletNFTs({
        //     address,
        //     chain
        // })
        // CollectionByAddress = await Moralis.EvmApi.nft.getWalletNFTCollections({
        //     address,
        //     chain
        // })
        // NftsByTokenAddress = await Moralis.EvmApi.nft.getWalletNFTs({
        //     address,
        //     chain,
        //     "tokenAddresses":getWalletActiveChains [
        //         "0xcf39966d2de5d1ee035b66504bcb701adc9dda47"
        //       ]
        // })

        // NftsByTokenAddress = await Moralis.EvmApi.wallets.getWalletActiveChains({
        //     address,
        // })

        // if(query.cursor){
        //     if(chain == "0x53A76215"){
        //         NFTs  = await Moralis.SolApi.nft.getNFTMetadata({
        //             address,
        //             chain,
        //           });
        //     }else if(chain == "0x1"){
        //         NFTs = Moralis.AptosApi.nfts.getNFTsByCreators({
        //             address,
        //             chain
        //           });
        //     }
        // }else if(chain == "0x53A76215"){
        //     NFTs  = await Moralis.SolApi.nft.getNFTMetadata({
        //         address,
        //         chain,
        //       });
        // }else if(chain == "0x1"){
        //     NFTs = Moralis.AptosApi.nfts.getNFTsByCreators({
        //         address,
        //         chain
        //       });
        // }

        
        //  if(query.cursor){
        //     if(chain == "0x53A76215"){
        //         NFTs  = await Moralis.SolApi.nft.getNFTMetadata({
        //             address,
        //             chain,
        //           });
        //     }else if(chain == "0x1"){
        //         NFTs = Moralis.AptosApi.nfts.getNFTsByCreators({
        //             address,
        //             chain
        //           });
        //     }else{
        //         NFTs = await Moralis.EvmApi.nft.getContractNFTs({
        //             address,
        //             chain
        //         })
        //     }
        // }else if(chain == "0x53A76215"){
        //     NFTs  = await Moralis.SolApi.nft.getNFTMetadata({
        //         address,
        //         chain,
        //       });
        // }else if(chain == "0x1"){
        //     NFTs = Moralis.AptosApi.nfts.getNFTsByCreators({
        //         address,
        //         chain
        //       });
        // }else{
        //     NFTs = await Moralis.EvmApi.nft.getContractNFTs({
        //         address,
        //         chain
        //     })
        // }

        // const collectable = CollectionByAddress.raw;
        const result = NFTs.raw;


        // console.log(result.result.token_address, result.name)


        // console.log(collectable)
        // console.log(Nfts)

        return res.status(200).json({ result })
    }catch(e){
        console.log(e);
        console.log("somthing went wrong");
        return res.status(400).json();
    }
})

Moralis.start({
    apiKey: Moralis_Api_Key
}).then(() => {
    app.listen(port, () => {
        console.log(`listening for api calls in port ${port}`)
    });
})



//  working apis for aptos and solana

// const Moralis = require("moralis").default;

// const Moralis_Api_Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjcyNDFlZDcxLTA4MjQtNGE3NC04MzVkLWFmOTA2NjYzZDRhYyIsIm9yZ0lkIjoiMzY2MTIxIiwidXNlcklkIjoiMzc2Mjc0IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiJiYThkYjhiNS05MjMzLTQzNTktYTU3Zi02NjIwNjZlN2Q5MzciLCJpYXQiOjE3MDExNjgxMzgsImV4cCI6NDg1NjkyODEzOH0.72ws8olO7sHl5idjE0n3oeK4Es9WSuCtvCqupRTeL0M"

// const runApp = async () => {
//   await Moralis.start({
//     apiKey: Moralis_Api_Key
//   });

//   const limit = 10;
// //   const creatorAddresses = "0xf932dcb9835e681b21d2f411ef99f4f5e577e6ac299eebee2272a39fb348f702";
//   const creatorAddresses = ["0xf932dcb9835e681b21d2f411ef99f4f5e577e6ac299eebee2272a39fb348f702"];
// //   const creatorAddresses = "0xEc5bA34a64BCa71D1fE72c62Af3E7e3Ad015FD2d"
// //   const creatorAddresses = "0x691835ed7d3f6f2Fc28f1f3401fFbef2Ecaa91e1"
// //   const creatorAddresses = "0xe1B4A86c252CA3b655061ea391B59b97Cb25fd44"

//   const network = "mainnet";

//   const response = Moralis.AptosApi.nfts.getNFTsByCreators({
//     limit,
//     creatorAddresses,
//     network
//   });

//   console.log(response.result);
// };

// runApp();


// const Moralis = require("moralis").default;
// const { SolNetwork } = require("@moralisweb3/common-sol-utils");

// const runApp = async () => {
//   await Moralis.start({
//     apiKey: "YOUR_API_KEY",
//     // ...and any other configuration
//   });

//   const address = "FVW9KoJxXzP2cCfhLfFC7hQKBZKnaoPkyZJQgvM9moWV";
// //   const address = "0xEc5bA34a64BCa71D1fE72c62Af3E7e3Ad015FD2d"
// //   const address = "0x691835ed7d3f6f2Fc28f1f3401fFbef2Ecaa91e1"
// //   const address = "0xe1B4A86c252CA3b655061ea391B59b97Cb25fd44"

//   const network = SolNetwork.MAINNET;

//   const response = await Moralis.SolApi.nft.getNFTMetadata({
//     address,
//     network,
//   });

//   console.log(response.toJSON());
// };

// runApp();


// const Moralis = require("moralis").default;
// const { EvmChain } = require("@moralisweb3/common-evm-utils");

// const Moralis_Api_Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjcyNDFlZDcxLTA4MjQtNGE3NC04MzVkLWFmOTA2NjYzZDRhYyIsIm9yZ0lkIjoiMzY2MTIxIiwidXNlcklkIjoiMzc2Mjc0IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiJiYThkYjhiNS05MjMzLTQzNTktYTU3Zi02NjIwNjZlN2Q5MzciLCJpYXQiOjE3MDExNjgxMzgsImV4cCI6NDg1NjkyODEzOH0.72ws8olO7sHl5idjE0n3oeK4Es9WSuCtvCqupRTeL0M"

// const runApp = async () => {
//   await Moralis.start({
//     apiKey: Moralis_Api_Key
//   });

//   const address = "0x691835ed7d3f6f2Fc28f1f3401fFbef2Ecaa91e1";

//   const chain = EvmChain.ETHEREUM;

//   const response = await Moralis.EvmApi.nft.getWalletNFTs({
//     address,
//     chain,
//   });

// //   console.log(response.toJSON());
//   console.log(response.result)
// };

// runApp();

//  get nfts br collections 

// import Moralis from 'moralis';

// const runApp = async() =>{
    
//     try {
//         await Moralis.start({
//             apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjcyNDFlZDcxLTA4MjQtNGE3NC04MzVkLWFmOTA2NjYzZDRhYyIsIm9yZ0lkIjoiMzY2MTIxIiwidXNlcklkIjoiMzc2Mjc0IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiJiYThkYjhiNS05MjMzLTQzNTktYTU3Zi02NjIwNjZlN2Q5MzciLCJpYXQiOjE3MDExNjgxMzgsImV4cCI6NDg1NjkyODEzOH0.72ws8olO7sHl5idjE0n3oeK4Es9WSuCtvCqupRTeL0M"
//         });
        
//         const response = await Moralis.EvmApi.nft.getWalletNFTCollections({
//             "chain": "0x1",
//             "address": "0xe1B4A86c252CA3b655061ea391B59b97Cb25fd44"
//         });
        
//         console.log(response.raw);
//     } catch (e) {
//         console.error(e);
//     }
// }

// runApp();

// 


// import Moralis from 'moralis';

// const runApp = async() =>{
//     try {x
//     await Moralis.start({
//         apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjcyNDFlZDcxLTA4MjQtNGE3NC04MzVkLWFmOTA2NjYzZDRhYyIsIm9yZ0lkIjoiMzY2MTIxIiwidXNlcklkIjoiMzc2Mjc0IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiJiYThkYjhiNS05MjMzLTQzNTktYTU3Zi02NjIwNjZlN2Q5MzciLCJpYXQiOjE3MDExNjgxMzgsImV4cCI6NDg1NjkyODEzOH0.72ws8olO7sHl5idjE0n3oeK4Es9WSuCtvCqupRTeL0M"
//     });

//     const response = await Moralis.EvmApi.nft.getWalletNFTs({
//         "chain": "0x1",
//         "tokenAddresses": [
//         "0xd0309b3f8006b25d8ea1214d989a234139a2e25e"
//         ],
//         "mediaItems": true,
//         "address": "0xe1B4A86c252CA3b655061ea391B59b97Cb25fd44"
//     });

//     console.log(response.raw);
//     } catch (e) {
//     console.error(e);
//     }
// }

// runApp();
