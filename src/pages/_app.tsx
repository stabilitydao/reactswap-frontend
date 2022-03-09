import { ResetCSS, Button, NotificationDot, Image, Toggle } from '@reactswap/uikit'
import Script from 'next/script'
import BigNumber from 'bignumber.js'
import { useThemeManager } from 'state/user/hooks'
import EasterEgg from 'components/EasterEgg'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import GlobalCheckClaimStatus from 'components/GlobalCheckClaimStatus'
import SubgraphHealthIndicator from 'components/SubgraphHealthIndicator'
import ChainIdProvider from 'contexts/chainId/ChainIdProvider'
import { ToastListener } from 'contexts/ToastsContext'
import useEagerConnect from 'hooks/useEagerConnect'
import { useInactiveListener } from 'hooks/useInactiveListener'
import useSentryUser from 'hooks/useSentryUser'
import useUserAgent from 'hooks/useUserAgent'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React, { Fragment, useState } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { useStore, persistor } from 'state'
import { usePollBlockNumber } from 'state/block/hooks'
import { usePollCoreFarmData } from 'state/farms/hooks'
import { NextPage } from 'next'
import { useFetchProfile } from 'state/profile/hooks'
import { Blocklist, Updaters } from '..'
import ErrorBoundary from '../components/ErrorBoundary'
import Menu from '../components/Menu'
import Providers from '../Providers'
import GlobalStyle from '../style/Global'

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

function GlobalHooks() {
  usePollBlockNumber()
  useEagerConnect()
  useFetchProfile()
  usePollCoreFarmData()
  useUserAgent()
  useInactiveListener()
  useSentryUser()
  return null
}

function MyApp(props: AppProps) {
  const { pageProps } = props
  const store = useStore(pageProps.initialReduxState)

  return (
    <>
      <ChainIdProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
          />
          <meta name="description" content="ReactSwap DeX" />
          <meta name="theme-color" content="#1FC7D4" />
          <title>ReactSwap</title>
        </Head>
        <Providers store={store}>
          <Blocklist>
            <GlobalHooks />
            <Updaters />
            <ResetCSS />
            <GlobalStyle />
            <GlobalCheckClaimStatus excludeLocations={[]} />
            <PersistGate loading={null} persistor={persistor}>
              <App {...props} />
            </PersistGate>
          </Blocklist>
        </Providers>
      </ChainIdProvider>
    </>
  )
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const NetworkFixed = styled.div`
  background-color: #1d1630;
  padding: 6px;
  border-left: 6px solid white;
  border-radius: 0px 12px 12px 0px;
  position: fixed;
  bottom: 100px;
`

const CustomLayout = styled.section`
  display: flex;
`
const CustomToggle = styled.div`
  @media (min-width: 1024px) {
    display: none;
  }
`

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { active, chainId } = useWeb3React()
  const [isSide, setisSide] = useState(false)
  const [isDark, toggleTheme] = useThemeManager()
  // Use the layout defined at the page level, if available
  const Layout = Component.Layout || Fragment
  const ModifiedLayout = styled.div`
    flex-grow: 1;
    height: 100vh;
    overflow: auto;
  `
  const Sidebar = styled.aside`
    width: 360px;
    background-color: ${isDark ? 'black' : 'white'};
    @media (max-width: 1024px) {
      position: fixed;
      top: 0;
      bottom: 0;
      z-index: 10;
      left: ${isSide ? '0px' : '-360px'};
    }
  `
  const CustomMenu = styled.nav`
    background-color: ${isDark ? 'black' : 'white'};
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 4px 10px;
    position: sticky;
    top: 0px;
    z-index: 10;
  `
  return (
    <ErrorBoundary>
      <CustomLayout>
        <Sidebar>Hello</Sidebar>
        <ModifiedLayout>
          <CustomMenu>
            <CustomToggle>
              <Toggle
                checked={isSide}
                onChange={() => {
                  setisSide(!isSide)
                }}
              />
            </CustomToggle>
          </CustomMenu>
          {/* <Menu> */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {/* </Menu> */}
        </ModifiedLayout>
      </CustomLayout>
      <EasterEgg iterations={2} />
      <ToastListener />
      <SubgraphHealthIndicator />
      {active && (
        <NetworkFixed>
          <NotificationDot show>
            {active &&
              [
                { name: 'ethereum', chainid: 1, image: 'ethereum.jpg' },
                { name: 'ropsten', chainid: 3, image: 'ropsten.png' },
                { name: 'polygon', chainid: 137, image: 'polygon.jpg' },
              ].map(({ name, chainid, image }): any => {
                if (chainid === chainId) {
                  return (
                    <img
                      src={`/networks/${image}`}
                      width={32}
                      height={32}
                      alt={name}
                      style={{ borderRadius: '10px' }}
                    />
                  )
                }
                return <div />
              })}
          </NotificationDot>
        </NetworkFixed>
      )}
    </ErrorBoundary>
  )
}

export default MyApp
