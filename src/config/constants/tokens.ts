import { ChainId, Token } from '@reactswap/sdk'
import { serializeToken } from 'state/user/hooks/helpers'
import { SerializedToken } from './types'

const { MAINNET, TESTNET, ROPSTEN, POLYGON } = ChainId

interface TokenList {
  [symbol: string]: Token
}

const defineTokens = <T extends TokenList>(t: T) => t

export const mainnetTokens = defineTokens({
  react: new Token(
    POLYGON,
    '0x2280EC541a667bC94F86ca18e6F7179D56b058A6', // not deployed yet
    18,
    'REACT',
    'ReactSwap',
    'https://reactswap.com',
  ),
  syrup: new Token(
    POLYGON,
    '0x009cF7bC57584b7998236eff51b98A168DceA9B0', // not deployed yet
    18,
    'rSYRUP',
    'React Syrup',
    'https://reactswap.com',
  ),
  weth: new Token(
    POLYGON,
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    18,
    'WETH',
    'Wrapped ETH',
    'https://weth.io',
  ),
  // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
  eth: new Token(MAINNET, '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', 18, 'ETH', 'ETH', ''),

  wmatic: new Token(
    POLYGON,
    '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    18,
    'WMATIC',
    'Wrapped Matic',
    'https://polygon.technology/',
  ),
  dai: new Token(
    POLYGON,
    '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    18,
    'DAI',
    'Dai Stablecoin',
    'https://www.makerdao.com/',
  ),
  usdc: new Token(
    POLYGON,
    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    6,
    'USDC',
    'USD Coin',
    'https://www.circle.com/en/usdc',
  ),
  usdt: new Token(
    POLYGON,
    '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    6,
    'USDT',
    'Tether USD',
    'https://tether.to/',
  ),
  wbtc: new Token(
    POLYGON,
    '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
    18,
    'WBTC',
    'Wrapped BTC',
    'https://wbtc.network/',
  ),
  profit: new Token(
    POLYGON,
    '0x29E4d6c08e3AD060Dc2fC8DCE70AaB8C8c57563F',
    18,
    'PROFIT',
    'Stability',
    'https://stabilitydao.org/',
  ),
} as const)

export const testnetTokens = defineTokens({
  weth: new Token(
    ROPSTEN,
    '0x0a180a76e4466bf68a7f86fb029bed3cccfaaac5',
    18,
    'WETH',
    'Wrapped ETH',
    // 'https://www.binance.com/',
  ),
  react: new Token(
    ROPSTEN,
    '0x2280EC541a667bC94F86ca18e6F7179D56b058A6',
    18,
    'REACT',
    'ReactSwap',
    // 'https://pancakeswap.finance/',
  ),
  usdc: new Token(
    ROPSTEN,
    '0x0D9C8723B343A8368BebE0B5E89273fF8D712e3C',
    6,
    'USDC',
    'USD Coin',
    'https://www.circle.com/en/usdc',
  ),
  syrup: new Token(
    ROPSTEN,
    '0x74ce4292557bC5e7a86749F84117EAe8706C3D85',
    18,
    'rSYRUP',
    'React Syrup',
    'https://reactswap.com',
  ),
  profit: new Token(
    ROPSTEN,
    '0x29E4d6c08e3AD060Dc2fC8DCE70AaB8C8c57563F',
    18,
    'PROFIT',
    'Stability',
    'https://stabilitydao.org/',
  ),

} as const)

const tokens = () => {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID

  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  if (parseInt(chainId, 10) === ChainId.TESTNET) {
    return Object.keys(mainnetTokens).reduce((accum, key) => {
      return { ...accum, [key]: testnetTokens[key] || mainnetTokens[key] }
    }, {} as typeof testnetTokens & typeof mainnetTokens)
  }

  return mainnetTokens
}

const unserializedTokens = tokens()

type SerializedTokenList = Record<keyof typeof unserializedTokens, SerializedToken>

export const serializeTokens = () => {
  const serializedTokens = Object.keys(unserializedTokens).reduce((accum, key) => {
    return { ...accum, [key]: serializeToken(unserializedTokens[key]) }
  }, {} as SerializedTokenList)

  return serializedTokens
}

export default unserializedTokens
