import { useNetwork } from 'wagmi'

function ActiveChain() {
  const { chain, chains } = useNetwork()

  return (
    <>
      {chain && <div>Connected to {chain.name}</div>}
      {/* {chains && (<div>Available chains: {chains.map((chain) => chain.name)}</div>)} */}
    </>
  )
}

export default ActiveChain