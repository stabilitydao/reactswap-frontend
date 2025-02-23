import React from 'react'
import styled from 'styled-components'
import { Text, Heading, Card, CardHeader, CardBody, Flex, Image } from '@reactswap/uikit'
import { useTranslation } from 'contexts/Localization'
import FoldableText from 'components/FoldableSection/FoldableText'
import config from './config'

const ImageWrapper = styled.div`
  flex: none;
  order: 2;
  max-width: 414px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    order: 1;
  }
`

const DetailsWrapper = styled.div`
  order: 1;
  margin-bottom: 40px;

  ${({ theme }) => theme.mediaQueries.md} {
    order: 2;
    margin-bottom: 0;
    margin-left: 40px;
  }
`

const IfoQuestions = () => {
  const { t } = useTranslation()

  return (
    <Flex alignItems={['center', null, null, 'start']} flexDirection={['column', null, null, 'row']}>
      <ImageWrapper>
        <Image src="/images/ifos/ifo-bunny.png" alt="ifo bunny" width={414} height={500} />
      </ImageWrapper>
      <DetailsWrapper>
        <Card>
          <CardHeader>
            <Heading scale="lg" color="secondary">
              {t('Details')}
            </Heading>
          </CardHeader>
          <CardBody>
            {config(t).map(({ title, description }, i, { length }) => (
              <FoldableText key={title} id={title} mb={i + 1 === length ? '' : '24px'} title={title}>
                {description.map((desc) => {
                  return (
                    <Text key={desc} color="textSubtle" as="p">
                      {desc}
                    </Text>
                  )
                })}
              </FoldableText>
            ))}
          </CardBody>
        </Card>
      </DetailsWrapper>
    </Flex>
  )
}

export default IfoQuestions
