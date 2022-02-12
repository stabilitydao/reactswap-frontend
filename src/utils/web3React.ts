import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { ConnectorNames } from '@reactswap/uikit'
import { ethers } from 'ethers'
import getNodeUrl from './getRpcUrl'

const POLLING_INTERVAL = 12000
const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10)
const rpcUrl = getNodeUrl(chainId)
const supportedChainIds = [
  1, // mainnet
  3, // ropsten
  4, // rinkeby
  5, // goreli
  42, // kovan
  80001, // Mumbai
  250, // fantom
  4002, // fantom testnet
  137, // matic
  80001, // matic testnet
  100, // xdai
  56, // binance smart chain
  97, // binance smart chain testnet
  1287, // moonbase
  43114, // avalanche
  43113, // fuji
  128, // heco
  256, // heco testnet
  1666600000, // harmony
  1666700000, // harmony testnet
  66, // okex testnet
  65, // okex testnet
  42161, // arbitrum
  42220, // celo
  11297108109, // palm
  1285, // moonriver
]
const injected = new InjectedConnector({ supportedChainIds })

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
  supportedChainIds,
})

const bscConnector = new BscConnector({ supportedChainIds })

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector,
}

export const getLibrary = (provider): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}

/**
 * BSC Wallet requires a different sign method
 * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
 */
export const signMessage = async (
  connector: AbstractConnector,
  provider: any,
  account: string,
  message: string,
): Promise<string> => {
  if (window.BinanceChain && connector instanceof BscConnector) {
    const { signature } = await window.BinanceChain.bnbSign(account, message)
    return signature
  }

  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider.provider?.wc) {
    const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
    const signature = await provider.provider?.wc.signPersonalMessage([wcMessage, account])
    return signature
  }

  return provider.getSigner(account).signMessage(message)
}
