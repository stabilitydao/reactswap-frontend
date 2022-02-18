import React, { useState, useEffect } from 'react'
import { Heading, Flex, Image, Text, Button, Tag, Input } from '@reactswap/uikit'
import PageHeader from 'components/PageHeader'
import Page, { PageMeta } from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { useXStakeContract, useReactTokenContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { ethers, Contract } from 'ethers'
import useToast from 'hooks/useToast'
import { getXStakeAddress } from 'utils/addressHelpers'
import ConnectWalletButton from 'components/ConnectWalletButton'
const StakeInput = styled.input`
  outline: none;
  width: 100%;
  border: none;
  background-color: transparent;
  padding: 4px 10px;
`
const UnStakeInput = styled.input`
  outline: none;
  width: 100%;
  border: none;
  background-color: transparent;
  padding: 4px 10px;
`
const InputWrapper = styled.div`
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  display: flex;
  background-color: #f3f4f6;
  margin-bottom: 10px;
`
const StakeMax = styled.button`
  outline: none;
  // width: 100%;
  border: none;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 4px 15px;
  border-radius: 50px;
`
const Wrapper = styled.main`
  border-radius: 20px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`
const BalanceTab = styled.div`
  width: 100%;
  margin: 2px;
  text-align: center;
  padding: 15px;
  color: white;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
`

const Voting = () => {
  const [actionType, setactionType] = useState<boolean>(true)
  const [isApproved, setisApproved] = useState<boolean>(false)
  const [stakedReact, setstakedReact] = useState<any>()
  const [xReactSupply, setxReactSupply] = useState<any>()
  const [Stake, setStake] = useState<string | null>(null)
  const [UnStake, setUnStake] = useState<string | null>(null)
  const XStakeContract = useXStakeContract()
  const ReactTokenContract = useReactTokenContract()
  const { toastSuccess, toastError } = useToast()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const { account, active } = useWeb3React()
  const getStakedReact = async () => {
    const stakedreact = await callWithGasPrice(ReactTokenContract, 'balanceOf', [XStakeContract.address])
    setstakedReact(ethers.utils.formatEther(stakedreact.toString()))
  }
  const getXReactSupply = async () => {
    const xreactsupply = await callWithGasPrice(XStakeContract, 'totalSupply')
    setxReactSupply(ethers.utils.formatEther(xreactsupply.toString()))
  }
  const handleApprove = async () => {
    if (active) {
      try {
        const tx = await callWithGasPrice(ReactTokenContract, 'approve', [
          XStakeContract.address,
          ethers.constants.MaxUint256,
        ])
        toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={tx.hash} />)
        const receipt = await tx.wait()
        if (receipt.status) {
          toastSuccess(
            t('Contract Enabled'),
            <ToastDescriptionWithTx txHash={receipt.transactionHash}>
              {t('You can now stake in the %symbol% vault!', { symbol: 'React' })}
            </ToastDescriptionWithTx>,
          )
        } else {
          toastError(
            t('Error'),
            t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
          )
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      toastError(t('Error'), t('Please try again.'))
    }
  }
  const handleUnstake = async () => {
    if (UnStake && active) {
      try {
        const tx = await callWithGasPrice(XStakeContract, 'leave', [ethers.utils.parseUnits(UnStake, 'ether')])
        toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={tx.hash} />)
        const receipt = await tx.wait()
        if (receipt.status) {
          toastSuccess(
            t('Unstaked'),
            <ToastDescriptionWithTx txHash={receipt.transactionHash}>
              {t('You have Unstaked your %symbol% tokens', { symbol: 'React' })}
            </ToastDescriptionWithTx>,
          )
          setUnStake(null)
        } else {
          toastError(
            t('Error'),
            t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
          )
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      toastError(t('Error'), t('Please try again.'))
    }
  }
  const handleStake = async () => {
    if (Stake && active) {
      try {
        const tx = await callWithGasPrice(XStakeContract, 'enter', [ethers.utils.parseUnits(Stake, 'ether')])
        toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={tx.hash} />)
        const receipt = await tx.wait()
        if (receipt.status) {
          toastSuccess(
            t('Staked'),
            <ToastDescriptionWithTx txHash={receipt.transactionHash}>
              {t('You have staked your %symbol% tokens', { symbol: 'React' })}
            </ToastDescriptionWithTx>,
          )
          setStake(null)
        } else {
          toastError(
            t('Error'),
            t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
          )
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      toastError(t('Error'), t('Please try again.'))
    }
  }
  const handleisApproved = async () => {
    try {
      const approveFor = await callWithGasPrice(ReactTokenContract, 'allowance', [account, XStakeContract.address])
      if (approveFor.toString() === '115792089237316195423570985008687907853269984665640564039457584007913129639935') {
        setisApproved(true)
      } else {
        setisApproved(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function handleAddXReact() {
    window.ethereum
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: getXStakeAddress(),
            symbol: 'xReact',
            decimals: 18,
            image: 'https://stabilitydao.org/xreact.png',
          },
        },
      })
      .then(() => {})
      .catch(() => {
        toastError(t('Error'), t('Please try again.'))
      })
  }
  useEffect(() => {
    handleisApproved()
    getStakedReact()
    getXReactSupply()
  })

  return (
    <>
      <PageMeta />
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="2" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('X-Stake Bar')}
            </Heading>
            <Heading scale="md" color="text">
              {t('Maximize yield by staking REACT for xREACT')}
            </Heading>
          </Flex>
          <Flex flex="1" height="fit-content" justifyContent="center" alignItems="center" mt={['24px', null, '0']}>
            <Image src="/images/xreact.png" width={120} height={120} />
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <Flex justifyContent="center">
          <Flex flexDirection="column" width={['100%', '500px']}>
            {!active && (
              <Wrapper style={{ marginBottom: '20px' }}>
                <Flex width="100%">
                  <ConnectWalletButton mr="8px" width="100%" />
                </Flex>
              </Wrapper>
            )}
            <Wrapper style={{ marginBottom: '20px' }}>
              <Flex width="100%">
                <Button
                  width="100%"
                  onClick={() => {
                    handleAddXReact()
                  }}
                >
                  Add Xreact to metamask
                </Button>
              </Flex>
            </Wrapper>
            {active && (
              <Wrapper style={{ marginBottom: '20px' }}>
                <Flex mb="10px" width="100%">
                  <BalanceTab>Balance: 100 React</BalanceTab>
                  <BalanceTab>Staked: 200 React</BalanceTab>
                </Flex>
              </Wrapper>
            )}
            {active && (
              <Wrapper>
                <Flex mb="10px" width="100%">
                  <Button
                    width="100%"
                    margin="2px"
                    onClick={() => {
                      setactionType(true)
                    }}
                  >
                    Stake
                  </Button>
                  <Button
                    width="100%"
                    margin="2px"
                    onClick={() => {
                      setactionType(false)
                    }}
                  >
                    Unstake
                  </Button>
                </Flex>
                <Flex mb="15px" width="100%" padding="2px">
                  <Flex display="flex" justifyContent="space-between" width="100%">
                    <Heading color="white">{actionType ? 'Stake' : 'UnStake'}</Heading>
                    <Tag variant="secondary" outline mr="8px">
                      1 xREACT = {stakedReact / xReactSupply} REACT
                    </Tag>
                  </Flex>
                </Flex>
                {actionType ? (
                  <Flex mb="15px" flexDirection="column" width="100%" padding="2px">
                    <InputWrapper>
                      <StakeInput
                        type="number"
                        placeholder="React"
                        onChange={(e) => {
                          setStake(e.target.value)
                        }}
                      />
                      <StakeMax>Max</StakeMax>
                    </InputWrapper>
                    {isApproved ? (
                      <Button onClick={handleStake}>Stake</Button>
                    ) : (
                      <Button onClick={handleApprove}>Approve</Button>
                    )}
                  </Flex>
                ) : (
                  <Flex mb="15px" flexDirection="column" width="100%" padding="2px">
                    <InputWrapper>
                      <UnStakeInput
                        type="number"
                        placeholder="xReact"
                        onChange={(e) => {
                          setUnStake(e.target.value)
                        }}
                      />
                      <StakeMax>Max</StakeMax>
                    </InputWrapper>
                    <Button onClick={handleUnstake}>Unstake</Button>
                  </Flex>
                )}
              </Wrapper>
            )}
          </Flex>
        </Flex>
      </Page>
    </>
  )
}

export default Voting
