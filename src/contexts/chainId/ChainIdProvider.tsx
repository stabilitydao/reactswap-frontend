import React, { useState } from 'react'
import { currentChainIdContext } from './index'
import { ChainIdContextProviderProps } from './types'

const ChainIdProvider = ({ children }: ChainIdContextProviderProps) => {
  const [currentChainId, setcurrentChainId] = useState<number>(3)
  const setChainId = (id: number) => {
    setcurrentChainId(id)
  }

  return (
    <currentChainIdContext.Provider value={{ currentChainId, setChainId }}>{children}</currentChainIdContext.Provider>
  )
}
export default ChainIdProvider
