
import {
  ThirdwebProvider,
  useContract,
  useContractMetadata,
  useAddress,
  useMetamask,
  Web3Button,
} from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";
import "./index.css";

const contractAddress = "0x00aD629685845FCfbEd45b8946bd7eC77aE2A003";

function MintPage() {
  const address = useAddress();
  const connect = useMetamask();
  const { contract } = useContract(contractAddress, "nft-drop");
  const { data: metadata } = useContractMetadata(contract);

  return (
    <div className="mint-container">
      <h1>Astro Karts Nigeria UFO Mint</h1>
      <p>
        Introducing Exclusive, playable Nigeria UFO Karts.<br />
        <a href="https://astrokarts.io/game/" target="_blank" rel="noreferrer">Play Now</a>
      </p>

      {metadata?.image && (
        <img
          src={metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
          alt="NFT"
          className="nft-preview"
        />
      )}

      {!address ? (
        <button onClick={connect}>Connect Wallet</button>
      ) : (
        <Web3Button
          contractAddress={contractAddress}
          action={async (contract) => {
            const owned = await contract.erc721.getOwned(address);
            if (owned.length > 0) {
              alert("You already claimed your Nigeria UFO!");
              return;
            }
            await contract.erc721.claim(1);
          }}
        >
          Mint Nigeria UFO
        </Web3Button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThirdwebProvider activeChain="sei" clientId="9db4f27b3ff418eb08e209f9d863cce7">
      <MintPage />
    </ThirdwebProvider>
  );
}
