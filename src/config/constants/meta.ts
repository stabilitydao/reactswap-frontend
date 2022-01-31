import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'ReactSwap',
  description:
    'AMM DeX on Polygon.',
  image: 'https://reactswap.com/logo.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('ReactSwap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('ReactSwap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('ReactSwap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('ReactSwap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('ReactSwap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('ReactSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('ReactSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('ReactSwap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('ReactSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('ReactSwap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('ReactSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('ReactSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('ReactSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('ReactSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('ReactSwap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('ReactSwap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('ReactSwap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('ReactSwap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('PancakeSwap Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('PancakeSwap Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('PancakeSwap Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('ReactSwap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('ReactSwap')}`,
      }
    case '/nfts/activity':
      return {
        title: `${t('Activity')} | ${t('ReactSwap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Profile')} | ${t('ReactSwap')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('ReactSwap')}`,
      }
    default:
      return null
  }
}
