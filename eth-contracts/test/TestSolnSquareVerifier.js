const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const {
  proof: { a, b, c },
  inputs
} = require("../../zokrates/code/square/proof.json");

contract("SolnSquareVerifier", (accounts) => {
  const account_one = accounts[0];

  describe("SolnSquareVerifier test", () => {
    // Test if a new solution can be added for contract - SolnSquareVerifier
    // addSolution is an internal function so I will skip testing it

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it("Test if an ERC721 token can be minted for contract - SolnSquareVerifier", async () => {
      let instance = await SolnSquareVerifier.deployed({ from: account_one });
      let balanceBefore = await instance.balanceOf(account_one);
    //   console.log('balanceBefore mint is 0', balanceBefore == 0)

      let tokenId = 0;
      await instance.verifyThenMint(account_one, tokenId, a, b, c, inputs);

      let balance = await instance.balanceOf(account_one);
      assert.equal(balance, 1, 'Balance should be 1 but is not')
    });
  });
});
