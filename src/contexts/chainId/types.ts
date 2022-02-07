import React from 'react'

export type ChainIdContextProviderProps = {
  children: React.ReactNode
}

export type ChainIdContextTypes = {
  currentChainId: number | null
  setChainId: (id: number) => void | null
  sync: boolean | null
  setsync: React.Dispatch<React.SetStateAction<boolean>> | null
}
