pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import {Verifier} from "./verifier.sol";
import "./ERC721Mintable.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is Verifier, CustomERC721Token {



    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        address to;
        uint tokenId;
    }


    // TODO define an array of the above struct
    Solution[] submittedSolutions;


    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) uniqueSolutions;


    // TODO Create an event to emit when a solution is added
    event SolutionAdded(
        address to,
        uint tokenId,
        bytes32 key
    );



    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(address to, uint tokenId, bytes32 key) internal {
        Solution memory soln = Solution(to, tokenId);
        submittedSolutions.push(soln);
        uniqueSolutions[key] = soln;
        emit SolutionAdded(to, tokenId, key);
    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function verifyThenMint(
        address to,
        uint tokenId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    )
        public
        // whenNotPaused
    {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(uniqueSolutions[key].to == address(0), 'Solution has been used before');
        require(verifyTx(a, b, c, input), 'Invalid proof');
        addSolution(msg.sender, tokenId, key);
        super.mint(to, tokenId);
    }
}

  


























