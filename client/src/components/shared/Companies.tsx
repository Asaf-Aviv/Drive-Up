import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import Typography from '../shared/Typography';
import Container from '../shared/Container';
import { Company as ICompany } from '../../store/movies/interfaces';
import Section from '../shared/Section';

interface Companies {
  companies: ICompany[];
  title?: string;
}

const Companies: React.FC<Companies> = ({ companies, title = 'Companies' }) => {
  if (!companies.length || companies.every(c => !c.logo_path)) return null;

  const renderCompany = ({ id, logo_path, name }: ICompany) =>
    logo_path && (
      <Link key={id} to={`/company/${id}`}>
        <LazyLoad>
          <CompanyLogo
            src={`https://image.tmdb.org/t/p/w300/${logo_path}`}
            title={name}
            alt={name}
          />
        </LazyLoad>
      </Link>
    );

  return (
    <CompaniesWrapper>
      <Container>
        <Typography
          as="h3"
          align="center"
          color="#000"
          margin="0 0 2rem 0"
        >
          {title}
        </Typography>
        <CompanyContainer>
          {companies.map(renderCompany)}
        </CompanyContainer>
      </Container>
    </CompaniesWrapper>
  );
};

const CompaniesWrapper = styled.div`
  background-color: #fff;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const CompanyLogo = styled.img`
  display: block;
  height: 100px;
  max-width: 100%;
  user-select: none;
`;

const CompanyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 3rem 1rem;
  justify-items: center;
`;

export default Companies;
