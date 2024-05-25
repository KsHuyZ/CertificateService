import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-ignition'
import 'dotenv/config';
import '@nomiclabs/hardhat-ethers';

const { API_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545/',
      // accounts: hardhat create
      chainId: 31337,
    },
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  solidity: '0.8.19',
  paths: {
    sources: 'contracts',
    artifacts: './certificate/src/services/blockchain/artifacts',
  },
};

export default config;
