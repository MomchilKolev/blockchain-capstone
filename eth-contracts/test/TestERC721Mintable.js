// var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');
var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // console.log(await this.contract)

            // TODO: mint multiple tokens
            await this.contract.mint(account_one, 0)
            await this.contract.mint(account_one, 1)
            await this.contract.mint(account_one, 2)
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply()
            // console.log('totalSupply is', totalSupply)
            return totalSupply
        })

        it('should get token balance', async function () { 
            let tokenBalance = await this.contract.balanceOf(account_one)
            // console.log('tokenBalance is', tokenBalance)
            return tokenBalance
        })
        
        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(0)
            // console.log('tokenURI is', tokenURI)
            return tokenURI
        })

        it('should transfer token from one owner to another', async function () { 
            let initialOwner = await this.contract.ownerOf(0)
            await this.contract.transferFrom(account_one, account_two, 0)
            let finalOwner = await this.contract.ownerOf(0)
            // console.log('initialOwner is', initialOwner)
            // console.log('finalOwner is', finalOwner)
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            try {
                await this.contract.mint(account_one, 0, { from: account_two })
            } catch (err) {
                assert.equal(err.reason, 'Caller is not contract owner', 'Something went wrong')
            }
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.get()
            assert.equal(owner, account_one, 'Incorrect contract owner')
        })

    });
})