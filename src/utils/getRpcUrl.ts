import sample from 'lodash/sample'
import { networks } from '../config/constants/networks'

/*if (
  process.env.NODE_ENV !== 'production' &&
  (!process.env.NEXT_PUBLIC_NODE_1 || !process.env.NEXT_PUBLIC_NODE_2 || !process.env.NEXT_PUBLIC_NODE_3)
) {
  throw Error('One base RPC URL is undefined')
}*/

// Array of available nodes to connect to
export const nodes = [process.env.NEXT_PUBLIC_NODE_1, process.env.NEXT_PUBLIC_NODE_2, process.env.NEXT_PUBLIC_NODE_3]

const getNodeUrl = (chainId) => {
  const c = chainId || 3
  return sample([networks[c].rpc])
  // Use custom node if available (both for development and production)
  // However on the testnet it wouldn't work, so if on testnet - comment out the NEXT_PUBLIC_NODE_PRODUCTION from env file
  /*if (process.env.NEXT_PUBLIC_NODE_PRODUCTION) {
    return process.env.NEXT_PUBLIC_NODE_PRODUCTION
  }
  return sample(nodes)*/
}

export default getNodeUrl
