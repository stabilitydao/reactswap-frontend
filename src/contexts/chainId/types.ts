import React from 'react'

export type ChainIdContextProviderProps = {
  children: React.ReactNode
}

export type ChainIdContextTypes = {
  currentChainId: number | null
  setChainId: (id: number) => void | null
}
