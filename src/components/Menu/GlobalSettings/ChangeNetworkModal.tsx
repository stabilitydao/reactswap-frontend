import React, { useState } from 'react'
import { Button, Text, Flex, Message, Modal, InjectedModalProps, Checkbox } from '@reactswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import { networks, networkOrder } from '../../../config/constants/networks'

interface ExpertModalProps {
  setshownetworkChangeModal: (boolean) => void
}

async function switchNetwork(network: any, library: any) {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: network.hexchainid }],
    })
  } catch (error: any) {
    if (error.code === 4902) {
      try {
        await library.currentProvider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: network.hexchainid,
              chainName: network.name,
              rpcUrls: [network.rpc],
              nativeCurrency: {
                name: network.name,
                symbol: network.symbol,
                decimals: network.chainid,
              },
              blockExplorerUrls: [network.explorerurl],
            },
          ],
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}

// export { switchNetwork }
const ChangeNetworkModal: React.FC<ExpertModalProps> = ({ setshownetworkChangeModal }) => {
  const { library, chainId } = useWeb3React()

  const { t } = useTranslation()

  return (
    <Modal
      title={t('Change Network')}
      onBack={() => setshownetworkChangeModal(false)}
      onDismiss={() => setshownetworkChangeModal(false)}
      headerBackground="gradients.cardHeader"
      style={{ maxWidth: '360px' }}
    >
      <Text mb="24px">{t('Choose which network to you want to switch.')}</Text>
      {networkOrder.map((id, index) => {
        const net = networks[id]
        return (
          <Button
            mb="8px"
            id="confirm-expert-mode"
            onClick={() => {
              switchNetwork(net, library)
              console.log(chainId)
            }}
          >
            {t(net.name)}
          </Button>
        )
      })}
      <Button
        variant="secondary"
        onClick={() => {
          setshownetworkChangeModal(false)
        }}
      >
        {t('Cancel')}
      </Button>
    </Modal>
  )
}

export default ChangeNetworkModal
