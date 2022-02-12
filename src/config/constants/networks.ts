import { ChainId } from '@reactswap/sdk'

const NETWORK_URLS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  [ChainId.TESTNET]: `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
  [ChainId.MUMBAI]: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
}

export const networkOrder = [3]

export const networks = {
  137: {
    name: 'Polygon',
    fullname: 'Polygon',
    color: '#8142ff',
    rpc: NETWORK_URLS[137],
    chainid: 137,
    hexchainid: '0x89',
    symbol: 'MATIC',
    explorerurl: 'https://polygonscan.com/',
    blocktimeAvgSec: 2.9,
  },
  3: {
    name: 'Ropsten',
    testnet: true,
    fullname: 'Ropsten testnet',
    color: '#ff0000',
    rpc: NETWORK_URLS[3],
    chainid: 3,
    hexchainid: '0x3',
    symbol: 'ETH',
    explorerurl: 'https://ropsten.etherscan.io/',
    blocktimeAvgSec: 13,
  },
  80001: {
    name: 'Mumbai',
    testnet: true,
    fullname: 'Mumbai testnet',
    color: '#c342ff',
    rpc: NETWORK_URLS[80001],
    chainid: 80001,
    hexchainid: '0x13881',
    symbol: 'MATIC',
    explorerurl: 'https://mumbai.polygonscan.com/',
    blocktimeAvgSec: 2.9,
  },
}

export default NETWORK_URLS
