import { createContext } from 'react'
import { ChainIdContextTypes } from './types'

export const currentChainIdContext = createContext<ChainIdContextTypes>({
  currentChainId: null,
  setChainId: null,
})
