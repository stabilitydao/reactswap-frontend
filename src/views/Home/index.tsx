import React from 'react'
import { CheckmarkIcon, Flex, Heading, Text } from '@reactswap/uikit'
import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import Container from 'components/Layout/Container'
import { PageMeta } from 'components/Layout/Page'
import Hero from './components/Hero'
import { swapSectionData, earnSectionData, cakeSectionData } from './components/SalesSection/data'
import MetricsSection from './components/MetricsSection'
import SalesSection from './components/SalesSection'
import WinSection from './components/WinSection'
import FarmsPoolsRow from './components/FarmsPoolsRow'
import Footer from './components/Footer'
import CakeDataRow from './components/CakeDataRow'
import { WedgeTopLeft, InnerWedgeWrapper, OuterWedgeWrapper, WedgeTopRight } from './components/WedgeSvgs'
import UserBanner from './components/UserBanner'
import FarmAuctionsBanner from './components/Banners/FarmAuctionsBanner'

const showBanner = false

const HomeBanner = ({ account }: { account: string }) => {
  if (!showBanner) {
    return null
  }

  return (
    <Flex
      pt={[account ? '220px' : '0', null, null, account ? '76px' : '0']}
      mt={[account ? '0' : '-16px', null, null, account ? '0' : '-48px']}
      pb="24px"
    >
      <FarmAuctionsBanner />
    </Flex>
  )
}

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const UserBannerWrapper = styled(Container)`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding-left: 0px;
  padding-right: 0px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 24px;
    padding-right: 24px;
  }
`


const Home: React.FC = () => {
  const { theme } = useTheme()
  const { account } = useWeb3React()

  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px' }

  return (
    <>
      <PageMeta />
      <StyledHeroSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        background={
          theme.isDark
            ? 'radial-gradient(103.12% 50% at 50% 50%, #21193A 0%, #191326 100%)'
            : 'linear-gradient(139.73deg, #E6FDFF 0%, #6FB6F1 100%)'
        }
        index={2}
        hasCurvedDivider={false}
      >
        {account && (
          <UserBannerWrapper>
            <UserBanner />
          </UserBannerWrapper>
        )}
        <HomeBanner account={account} />
        <Hero />
      </StyledHeroSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={
          theme.isDark
            ? 'linear-gradient(180deg, #781b1b 0%, #2d1155 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #858cff 100%)'
        }
        index={2}
        hasCurvedDivider={false}
      >
        <div>
          <Heading scale="xxl" color="secondary" mb="24px">
            Roadmap
          </Heading>
          <Flex flexDirection="column">
            <Text fontSize="22px" color="text" lineHeight={1.5}><CheckmarkIcon color="text" mr={1} />Uniswap-V2 based AMM</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5}><CheckmarkIcon color="text" mr={1} />Farms</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5}><CheckmarkIcon color="text" mr={1} />React Pools</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5}><CheckmarkIcon color="text" mr={1} />X-Stake Bar</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5}><CheckmarkIcon color="text" mr={1} />RFI / TAX</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5}><CheckmarkIcon color="text" mr={1} />Ropsten testnet pre-alpha</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5} pl="26px">Subgraph and analytics</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5} pl="26px">Price chart</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5} pl="26px">Mumbai testnet alpha</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5} pl="26px">Polygon mainnet deployment</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5} pl="26px">TGE</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5} pl="26px">Liquidity lock</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5} pl="26px">Liquidity migration</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5} pl="26px">Limit orders</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5} pl="26px">Isolated lending & leverage</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5} pl="26px">Initial farm offering launchpad</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5} pl="26px">Trading competitions (profiles, teams)</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5} pl="26px">Prediction</Text>
            <Text fontSize="22px" color="text" lineHeight={1.5} pl="26px">Lottery</Text>
          </Flex>
        </div>
      </PageSection>
      {/* <PageSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        background={
          theme.isDark
            ? 'linear-gradient(180deg, #09070C 22%, #201335 100%)'
            : 'linear-gradient(180deg, #FFFFFF 22%, #D7CAEC 100%)'
        }
        index={2}
        hasCurvedDivider={false}
      >
        <MetricsSection />
      </PageSection> */}
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={
          theme.isDark
            ? 'linear-gradient(180deg, #2d1155 0%, #084956 100%)'
            : 'linear-gradient(180deg, #858cff 0%, #EAF2F6 100%)'
        }
        index={2}
        hasCurvedDivider={false}
      >
        <SalesSection {...swapSectionData} />
      </PageSection>
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={
          theme.isDark
            ? 'linear-gradient(180deg, #084956 0%, #150330 100%)'
            : 'linear-gradient(180deg, #EAF2F6 0%, #d4fffa 100%)'
        }
        index={2}
        hasCurvedDivider={false}
      >
        <SalesSection {...earnSectionData} />
        <FarmsPoolsRow />
      </PageSection>
      {/* <PageSectionsecondaryButton
        innerProps={{ style: HomeSectionContainerStyles }}
        background={
          theme.isDark
            ? 'linear-gradient(180deg, #0B4576 0%, #091115 100%)'
            : 'linear-gradient(180deg, #6FB6F1 0%, #EAF2F6 100%)'
        }
        index={2}
        hasCurvedDivider={false}
      >
        <WinSection />
      </PageSection> */}
       <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={
          theme.isDark
            ? 'linear-gradient(180deg, #150330 0%, #27262c 100%)'
            : 'linear-gradient(180deg, #d4fffa 0%, #efa9ff 100%)'
        }
        index={2}
        hasCurvedDivider={false}
      >
        <SalesSection {...cakeSectionData} />
        <CakeDataRow />
      </PageSection>
      {/* <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background="linear-gradient(180deg, #7645D9 0%, #5121B1 100%)"
        index={2}
        hasCurvedDivider={false}
      >
        <Footer />
      </PageSection> */}
    </>
  )
}

export default Home
