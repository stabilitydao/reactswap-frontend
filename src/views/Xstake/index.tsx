import { Heading, Flex, Image, Text, Button, Tag, Input } from '@reactswap/uikit'
import PageHeader from 'components/PageHeader'
import { PageMeta } from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/Layout/Page'
import { AppHeader, AppBody } from '../../components/App'
import styled from 'styled-components'
import React from 'react'

const StakeInput = styled.input`
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
  const { t } = useTranslation()
  return (
    <>
      <PageMeta />
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="2" flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('Stake React')}
            </Heading>
            <Heading scale="md" color="text">
              {t('X-Stake Bar is the coolest bar in town.')}
            </Heading>
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <Flex justifyContent="center">
          <Flex flexDirection="column" width={['100%', '500px']}>
            <Wrapper style={{ marginBottom: '20px' }}>
              <Flex mb="10px" width="100%">
                <BalanceTab>Balance: 100 React</BalanceTab>
                <BalanceTab>Staked: 200 React</BalanceTab>
              </Flex>
            </Wrapper>
            <Wrapper>
              <Flex mb="10px" width="100%">
                <Button width="100%" margin="2px">
                  Stake
                </Button>
                <Button width="100%" margin="2px">
                  Unstake
                </Button>
              </Flex>
              <Flex mb="15px" width="100%" padding="2px">
                <Flex display="flex" justifyContent="space-between" width="100%">
                  <Heading>Stake</Heading>
                  <Tag variant="secondary" outline mr="8px">
                    1 xSUSHI = 1.2361 SUSHI
                  </Tag>
                </Flex>
              </Flex>
              <Flex mb="15px" flexDirection="column" width="100%" padding="2px">
                <InputWrapper>
                  <StakeInput placeholder="xReact" />
                  <StakeMax>Max</StakeMax>
                </InputWrapper>
                <Button>Add</Button>
              </Flex>
            </Wrapper>
          </Flex>
        </Flex>
      </Page>
    </>
  )
}

export default Voting
