//var ConvertLib = artifacts.require('./ConvertLib.sol')
var GestionPartes = artifacts.require('./GestionPartes.sol')

module.exports = function (deployer) {
  //deployer.deploy(ConvertLib)
  //deployer.link(ConvertLib, GestionPartes)
  deployer.deploy(GestionPartes)
}
