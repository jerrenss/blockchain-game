const ElephantToken = artifacts.require("ElephantToken");

module.exports = function(deployer) {
  deployer.deploy(ElephantToken);
};
