// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    ganache: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
      gasPrice:   0x1,
      gas:        0x1fffffffffffff
    }
  }
  
}
