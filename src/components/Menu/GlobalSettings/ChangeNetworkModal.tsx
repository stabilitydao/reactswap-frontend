import React, { useState } from 'react'
import { Button, Text, Flex, Message, Modal, InjectedModalProps, Checkbox } from '@reactswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
interface ExpertModalProps {
  setshownetworkChangeModal: (boolean) => void
}

const networkOrder = [137, 3, 80001]

const networks = {
  137: {
    name: 'Polygon',
    fullname: 'Polygon',
    color: '#8142ff',
    rpc: `${process.env.NEXT_PUBLIC_RPC_POLYGON}`,
    chainid: 137,
    hexchainid: '0x89',
    symbol: 'MATIC',
    explorerurl: 'https://polygonscan.com/',
    blocktimeAvgSec: 2.9,
  },
  3: {
    name: 'Ropsten',
    testnet: true,
    fullname: 'Ropsten testnet',
    color: '#ff0000',
    rpc: `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
    chainid: 3,
    hexchainid: '0x3',
    symbol: 'ETH',
    explorerurl: 'https://ropsten.etherscan.io/',
    blocktimeAvgSec: 13,
  },
  80001: {
    name: 'Mumbai',
    testnet: true,
    fullname: 'Mumbai testnet',
    color: '#c342ff',
    rpc: `${process.env.NEXT_PUBLIC_RPC_MUMBAI}`,
    chainid: 80001,
    hexchainid: '0x13881',
    symbol: 'MATIC',
    explorerurl: 'https://mumbai.polygonscan.com/',
    blocktimeAvgSec: 2.9,
  },
}
async function switchNetwork(network: any, library: any) {
  try {
    await library.currentProvider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: network.hexchainid }],
    })
  } catch (error) {
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

export { switchNetwork }
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
