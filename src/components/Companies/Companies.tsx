import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
import { Company as ICompany } from 'store/types'
import { Container, SectionTitle } from 'components'

type Props = {
  companies: ICompany[]
  title?: string
}

const Companies = ({ companies, title = 'Companies' }: Props) => {
  if (!companies.some(company => company.backdrop)) return null

  return (
    <CompaniesWrapper>
      <Container>
        <SectionTitle centered>
          {title}
        </SectionTitle>
        <CompanyContainer>
          {companies
            .filter(({ backdrop }) => backdrop)
            .map(({ id, backdrop, name }) => (
              <Link key={id} to={`/company/${id}`} aria-label={name}>
                <LazyLoad offset={400} once>
                  <CompanyLogo
                    src={`https://image.tmdb.org/t/p/w300/${backdrop}`}
                    title={name}
                    alt={name}
                  />
                </LazyLoad>
              </Link>
            ))}
        </CompanyContainer>
      </Container>
    </CompaniesWrapper>
  )
}

const CompaniesWrapper = styled.div`
  background: #fff;
  padding-top: 2rem;
  padding-bottom: 2rem;
  &:first-of-type {
    margin-top: 3rem;
  }
`

const CompanyLogo = styled.img`
  display: block;
  max-width: 100%;
  user-select: none;
`

const CompanyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > a {
    padding: 0 2rem;
    margin: 0 auto 2rem auto;
  }
`

export default Companies
