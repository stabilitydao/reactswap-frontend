import { ethers } from 'ethers'
import getRpcUrl from 'utils/getRpcUrl'

// todo get current chain id from state
const RPC_URL = getRpcUrl(3)

export const simpleRpcProvider = new ethers.providers.StaticJsonRpcProvider(RPC_URL)

export default null
