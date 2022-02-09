import { ChainId, JSBI, Percent, Token } from '@reactswap/sdk'
import { mainnetTokens, testnetTokens } from './tokens'

// ropsten router
export const ROUTER_ADDRESS = '0xE30184E3957E6f02d2C57ee4AFBe9A789222E586'

export const USD_NATIVE_FARM_PID = {
  [ChainId.ROPSTEN]: 2,
}

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.POLYGON]: [
    mainnetTokens.eth, // wmatic
    mainnetTokens.weth,
    mainnetTokens.react,
    mainnetTokens.usdc,
    mainnetTokens.usdt,
    mainnetTokens.dai,
    mainnetTokens.wbtc,
    mainnetTokens.wmatic,
  ],
  [ChainId.TESTNET]: [
    testnetTokens.weth,
    testnetTokens.react,
    testnetTokens.usdc,
    testnetTokens.profit,
    testnetTokens.usdt,
    testnetTokens.dai,
  ],
}

/**
 * Addittional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WETH[ChainId.MAINNET]]
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  [ChainId.POLYGON]: [
    // mainnetTokens.weth,
    mainnetTokens.profit,
    mainnetTokens.usdc,
    mainnetTokens.react,
  ],
  [ChainId.ROPSTEN]: [
     // testnetTokens.weth,
    testnetTokens.profit,
    testnetTokens.usdc,
    testnetTokens.react,
  ],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.POLYGON]: [
    mainnetTokens.weth,
    mainnetTokens.wbtc,
    mainnetTokens.react,
    mainnetTokens.usdc,
    mainnetTokens.usdt,
    mainnetTokens.profit,
  ],
  [ChainId.ROPSTEN]: [
    testnetTokens.react,
    testnetTokens.weth,
    testnetTokens.usdt,
    testnetTokens.wbtc,
    testnetTokens.usdc,
    testnetTokens.profit,
  ],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.POLYGON]: [
    [mainnetTokens.react, mainnetTokens.weth],
    [mainnetTokens.react, mainnetTokens.wmatic],
    [mainnetTokens.react, mainnetTokens.usdc],
  ],
  [ChainId.ROPSTEN]: [
    [testnetTokens.react, testnetTokens.weth],
    // [testnetTokens.react, testnetTokens.wmatic],
    [testnetTokens.react, testnetTokens.usdc],
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much BNB so they end up with <.01
export const MIN_BNB: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 BNB
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = []

export { default as farmsConfig } from './farms'
export { default as poolsConfig } from './pools'
export { default as ifosConfig } from './ifo'

export const FAST_INTERVAL = 10000
export const SLOW_INTERVAL = 60000
