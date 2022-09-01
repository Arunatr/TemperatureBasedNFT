var TemperatureBasedNft = artifacts.require("temperatureBasedNft.sol");

module.exports = function(deployer) {
  deployer.deploy(TemperatureBasedNft,'Kumar','KKK');
};

