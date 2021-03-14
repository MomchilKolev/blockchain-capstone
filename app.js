const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require("web3");

const MNEMONIC = process.env.MNEMONIC;
const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY;
const isInfura = !!process.env.INFURA_KEY;
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const NETWORK = process.env.NETWORK;
const NFT_ABI = require('./eth-contracts/build/contracts/SolnSquareVerifier.json')
const tokensToMint = 10
const { proof: {a, b, c}, inputs } = require('./zokrates/code/square/proof.json')

if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error(
      "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
    );
    return;
  }

async function main() {
    const network =
    NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";

    const provider = new HDWalletProvider(
        MNEMONIC,
        isInfura
          ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
          : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
      );
      const web3Instance = new web3(provider);

      const nftContract = new web3Instance.eth.Contract(
        NFT_ABI.abi,
        NFT_CONTRACT_ADDRESS,
        { gasLimit: "1000000" }
      );
  
      // Creatures issued directly to the owner.
    //   for (var i = 0; i < tokensToMint; i++) {
        const result = await nftContract.methods
          .verifyThenMint(OWNER_ADDRESS, 0, a, b, c, inputs)
          .send({ from: OWNER_ADDRESS });
        console.log("Minted token. Transaction: " + result.transactionHash);
    //   }
}

main()