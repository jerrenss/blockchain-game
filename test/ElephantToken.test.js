/* eslint-disable no-undef */
const ElephantToken = artifacts.require('./ElephantToken.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Elephant Token', (accounts) => {
  let token

  describe('deployment', async () => {
    it('deploys succesfully', async() => {
      token = await ElephantToken.deployed()
      const address = token.address
      console.log(address)
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    });
  });
  
})
