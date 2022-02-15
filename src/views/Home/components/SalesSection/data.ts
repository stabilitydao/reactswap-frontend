import { SalesSectionProps } from '.'

export const swapSectionData: SalesSectionProps = {
  headingText: 'Trade anything. No registration, no hassle.',
  bodyText: 'Trade any token on Polygon (Matic) in seconds, just by connecting your wallet.',
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: 'Swap',
    external: false,
  },
  secondaryButton: {
    to: '/liquidity',
    text: 'Provide Liquidity',
    external: false,
  },
  images: {
    path: '/images/home/trade/',
    attributes: [
      { src: 'PROFIT', alt: 'PROFIT token' },
      { src: 'BTC', alt: 'WBTC token' },
      { src: 'REACT', alt: 'REACT token' },
    ],
  },
}

export const earnSectionData: SalesSectionProps = {
  headingText: 'Earn passive income with crypto.',
  bodyText: 'ReactSwap makes it easy to make your crypto work for you.',
  reverse: true,
  primaryButton: {
    to: '/farms',
    text: 'Explore Farms',
    external: false,
  },
  secondaryButton: {
    to: '/pools',
    text: 'Explore React Pools',
    external: false,
  },
  images: {
    path: '/images/home/earn/',
    attributes: [
      { src: 'pie', alt: 'Pie chart' },
      { src: 'stonks', alt: 'Stocks chart' },
      // { src: 'folder', alt: 'Folder with cake token' },
    ],
  },
}

export const cakeSectionData: SalesSectionProps = {
  headingText: 'REACT makes our world go round.',
  bodyText:
    'REACT token is at the heart of the ReactSwap ecosystem. Buy it, farm it, spend it, stake it... heck, you can even stake and vote with it!',
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: 'Buy REACT',
    external: false,
  },
  secondaryButton: {
    to: '/xstake',
    text: 'Visit X-Stake Bar',
    external: false,
  },

  images: {
    path: '/images/home/cake/',
    attributes: [
      // { src: 'bottom-right', alt: 'Small 3d pancake' },
      // { src: 'top-right', alt: 'Small 3d pancake' },
      { src: 'REACT', alt: 'REACT token' },
      // { src: 'top-left', alt: 'Small 3d pancake' },
    ],
  },
}
