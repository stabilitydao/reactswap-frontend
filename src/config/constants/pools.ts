import { VaultKey } from 'state/types'
import tokens, { serializeTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'

const serializedTokens = serializeTokens()

// console.log(tokens)
export const vaultPoolConfig = {
  [VaultKey.CakeVault]: {
    name: 'Auto REACT',
    description: 'Automatic restaking',
    autoCompoundFrequency: 100,
    gasLimit: 480000,
    tokenImage: {
      primarySrc: `/images/tokens/${tokens.react.address}.png`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  /* [VaultKey.IfoPool]: {
    name: 'IFO REACT',
    description: 'Stake REACT to participate in IFOs',
    autoCompoundFrequency: 1,
    gasLimit: 500000,
    tokenImage: {
      primarySrc: `/images/tokens/${tokens.react.address}.svg`,
      secondarySrc: `/images/tokens/ifo-pool-icon.svg`,
    },
  }, */
} as const

const pools: SerializedPoolConfig[] = [
  {
    sousId: 0,
    stakingToken: serializedTokens.react,
    earningToken: serializedTokens.react,
    contractAddress: {
      3: '0x3EC9060E52b9B435Db7fDeC55CA33B8bcBaF2D2b',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.1',
    sortOrder: 1,
    isFinished: false,
  },
  /* {
    sousId: 257,
    stakingToken: serializedTokens.cake,
    earningToken: serializedTokens.froyo,
    contractAddress: {
      97: '',
      56: '0x1c9E3972fdBa29b40954Bb7594Da6611998F8830',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    sortOrder: 999,
    tokenPerBlock: '2.893',
  }, */
]

export default pools
