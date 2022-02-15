import { ChainId, Token } from '@reactswap/sdk'
import { serializeToken } from 'state/user/hooks/helpers'
import { SerializedToken } from './types'

const { /* MAINNET, TESTNET, */ ROPSTEN, POLYGON } = ChainId

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
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped ETH',
    'https://weth.io',
  ),
  // eth here points to the weth contract. Wherever the currency ETH is required, conditional checks for the symbol 'ETH'/ can be used
  eth: new Token(
    POLYGON,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    18,
    'WMATIC',
    'Wrapped Matic',
    'https://polygon.technology/',
  ),

  wmatic: new Token(
    POLYGON,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
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
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    6,
    'USDC',
    'USD Coin',
    'https://www.circle.com/en/usdc',
  ),
  usdt: new Token(
    POLYGON,
    '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    6,
    'USDT',
    'Tether USD',
    'https://tether.to/',
  ),
  wbtc: new Token(
    POLYGON,
    '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
    18,
    'WBTC',
    'Wrapped BTC',
    'https://wbtc.network/',
  ),
  profit: new Token(
    POLYGON,
    '0x48469a0481254d5945E7E56c1Eb9861429c02f44',
    18,
    'PROFIT',
    'Stability',
    'https://stabilitydao.org/',
  ),
} as const)

export const testnetTokens = defineTokens({
  weth: new Token(
    ROPSTEN,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped ETH',
  ),
  eth: new Token(
    ROPSTEN,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped ETH',
  ),
  react: new Token(
    ROPSTEN,
    '0x2925293d027391eD3CC24bf4a4B80D072FCBB714',
    18,
    'REACT',
    'ReactSwap',
    'https://reactswap.com',
  ),
  usdc: new Token(
    ROPSTEN,
    '0x0D9C8723B343A8368BebE0B5E89273fF8D712e3C',
    6,
    'USDC',
    'USD Coin',
    'https://www.circle.com/en/usdc',
  ),
  usdt: new Token(
    ROPSTEN,
    '0x110a13FC3efE6A245B50102D2d79B3E76125Ae83',
    6,
    'USDT',
    'Tether USD',
    'https://tether.to/',
  ),
  wbtc: new Token(
    ROPSTEN,
    '0x442Be68395613bDCD19778e761f03261ec46C06D',
    18,
    'WBTC',
    'Wrapped BTC',
    'https://wbtc.network/',
  ),
  dai: new Token(
    ROPSTEN,
    '0xc2118d4d90b274016cB7a54c03EF52E6c537D957',
    18,
    'DAI',
    'Dai Stablecoin',
    'https://www.makerdao.com/',
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
  // todo chainid
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
