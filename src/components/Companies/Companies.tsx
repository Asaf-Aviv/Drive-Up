import React from 'react'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
import { Company as ICompany } from 'store/types'
import { Container, SectionTitle } from 'components'

type Props = {
  companies: ICompany[]
  title?: string
}

const Companies = ({ companies, title = 'Companies' }: Props) => {
  if (companies.every(company => !company.backdrop)) return null

  return (
    <CompaniesWrapper>
      <Container>
        <StyledSectionTitle centered>{title}</StyledSectionTitle>
        <CompanyContainer>
          {companies
            .filter(({ backdrop }) => backdrop)
            .map(({ id, backdrop, name }) => (
              <CompanyWrapper key={id}>
                <LazyLoad offset={400} once>
                  <CompanyLogo
                    src={`https://image.tmdb.org/t/p/w300/${backdrop}`}
                    title={name}
                    alt={name}
                  />
                </LazyLoad>
              </CompanyWrapper>
            ))}
        </CompanyContainer>
      </Container>
    </CompaniesWrapper>
  )
}

const StyledSectionTitle = styled(SectionTitle)`
  color: #000;
`

const CompanyWrapper = styled.div`
  flex: 1;
  padding: 1rem 2rem;
  flex-basis: 200px;
`

const CompaniesWrapper = styled.div`
  background: #fff;
  padding-top: 2rem;
  padding-bottom: 2rem;
  &:first-of-type {
    margin-top: 3rem;
  }
`

const CompanyLogo = styled.img`
  max-width: 100%;
`

const CompanyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

export default Companies
