const TempratureBasedNft = artifacts.require('../contracts/tempratureBasedNft.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('TempratureBasedNft', (accounts) => {
  let contract
   before(async () => {
    contract = await TempratureBasedNft.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, 'Kumar')
    })

    it('has a symbol', async () => {
      const symbol = await contract.symbol()
      assert.equal(symbol, 'KKK')
    })

  })


describe('minting', async () => {

    it('updating a Temperature', async () => {
       const Temperature = await contract.temperature()
       assert.isAbove(Temperature,0)
       
    })

    it('creating a NFT', async () => {
      const Temperature = await contract.temperature()
      assert.isAbove(Temperature,1500)	
      const result = await contract.mintNft                      ('0xf97f14e2c9224d5269376e29d353b4d4efe20321a1474fb647ac24e1e9ec7751','1001','https://trufflesuite.com/ganache/')
      const totalSupply = await contract.totalSupply()
      // SUCCESS
      assert.equal(totalSupply, 1)
      // FAILURE: cannot mint same id twice
      await contract.mintNft            ('0xf97f14e2c9224d5269376e29d353b4d4efe20321a1474fb647ac24e1e9ec7751','1001','https://trufflesuite.com/ganache/').should.be.rejected;
    })
  })

describe('Query', async () => { 

    it('Should have logged a new Provable query', async () => {
      const result = await contract.updateTemperature()  
      const event = result.logs[0].args
      assert.Equal(event.description,
      'Provable query was sent, standing by for the answer...',
      'Provable query incorrectly logged!')

    })

  })
})
