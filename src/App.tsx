
import {
  ConnectButton,
  ThirdwebProvider,
  useActiveWallet,
  useActiveClaimCondition,
  useClaimedNFTSupply,
  useNFTContract,
  useClaimNFT,
  useTotalCount,
} from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { sei } from "thirdweb/chains";
import "./index.css";

const client = createThirdwebClient({
  clientId: "9db4f27b3ff418eb08e209f9d863cce7",
});

const contractAddress = "0x00aD629685845FCfbEd45b8946bd7eC77aE2A003";

function MintPage() {
  const wallet = useActiveWallet();
  const { contract } = useNFTContract({ client, chain: sei, address: contractAddress });
  const { data: claimCondition } = useActiveClaimCondition({ contract });
  const { data: claimed } = useClaimedNFTSupply({ contract });
  const { data: total } = useTotalCount({ contract });
  const { mutateAsync: claimNFT, isPending } = useClaimNFT({ contract });

  const handleMint = async () => {
    if (!wallet) return;
    const ownedNFTs = await contract?.erc721.getOwned(wallet.address);
    if (ownedNFTs && ownedNFTs.length > 0) {
      alert("You already claimed your UFO!");
      return;
    }
    await claimNFT({ quantity: 1 });
  };

  return (
    <div className="mint-container">
      <h1>Astro Karts Nigeria UFO Mint</h1>
      <p>
        Introducing Exclusive, playable Nigeria UFO Karts.<br />
        <a href="https://astrokarts.io/game/" target="_blank" rel="noreferrer">Play Now</a>
      </p>
      <img src="/logo.png" alt="NFT" className="nft-preview" />
      <p>
        {claimed?.toString() || 0} / {total?.toString() || 0} minted
      </p>
      <ConnectButton client={client} chain={sei} />
      {wallet && (
        <button onClick={handleMint} disabled={isPending}>
          {isPending ? "Minting..." : "Mint Nigeria UFO"}
        </button>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThirdwebProvider client={client} activeChain={sei}>
      <MintPage />
    </ThirdwebProvider>
  );
}
