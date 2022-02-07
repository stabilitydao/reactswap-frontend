import React, { useState } from 'react'
import { currentChainIdContext } from './index'
import { ChainIdContextProviderProps } from './types'

const ChainIdProvider = ({ children }: ChainIdContextProviderProps) => {
  const [sync, setsync] = useState<boolean>(false)
  const [currentChainId, setcurrentChainId] = useState<number>(137)
  const setChainId = (id: number) => {
    setcurrentChainId(id)
  }

  return (
    <currentChainIdContext.Provider value={{ currentChainId, setChainId, sync, setsync }}>
      {children}
    </currentChainIdContext.Provider>
  )
}
export default ChainIdProvider
