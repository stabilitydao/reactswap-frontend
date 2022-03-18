import styled from 'styled-components'
import React, { useState, useContext, Dispatch, SetStateAction } from 'react'
import { Button, Text, Flex, Message, Modal, InjectedModalProps, Checkbox } from '@reactswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import { currentChainIdContext } from 'contexts/chainId'
import { networks, networkOrder } from '../../../config/constants/networks'

const Btn = styled(Button)`
  background-color: ${(props) => (props.active === true ? '#187a81' : ({ theme }) => theme.colors.primary)};
`
interface ChangeNetworkModalProps extends InjectedModalProps {
  onDismiss?: () => void
}

async function switchNetwork(network: any, setChainId: any) {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: network.hexchainid }],
    })
    setChainId(network.chainid)
  } catch (error: any) {
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
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
        setChainId(network.chainid)
      } catch (err) {
        console.log(err)
      }
    }
  }
}

export { switchNetwork }
const ChangeNetworkModal: React.FC<ChangeNetworkModalProps> = ({ onDismiss }) => {
  const { library, chainId, active } = useWeb3React()
  const { currentChainId, setChainId } = useContext(currentChainIdContext)
  const { t } = useTranslation()

  return (
    <Modal
      title={t('Change Network')}
      onBack={onDismiss}
      onDismiss={onDismiss}
      headerBackground="gradients.cardHeader"
      style={{ maxWidth: '360px' }}
    >
      <Text mb="24px">{t('Choose which network to you want to switch.')}</Text>
      {networkOrder.map((id, index) => {
        const net = networks[id]
        return (
          <Btn
            mb="8px"
            id="confirm-expert-mode"
            onClick={() => {
              // if (active) {
              //   switchNetwork(net, setChainId)
              // } else {
              setChainId(net.chainid)
              // }
              onDismiss()
            }}
            active={currentChainId === net.chainid ?? false}
          >
            {t(net.name)}
          </Btn>
        )
      })}
      <Button
        variant="secondary"
        onClick={() => {
          onDismiss()
        }}
      >
        {t('Cancel')}
      </Button>
    </Modal>
  )
}

export default ChangeNetworkModal
