import React from 'react';
import styled from 'styled-components';
import { minutesConverter } from '../../utils';
import { Crew } from '../../store/movies/interfaces';
import ExternalLink from './ExternalLink';
import FieldValue from './FieldValue';

interface MediaDetails {
  mediaType: 'movie' | 'show';
  name: string;
  runtime: number | null;
  director?: Crew;
  writers?: Crew[];
  countryNames?: string;
  languageNames?: string;
  budget?: number;
  revenue?: number;
  homepage: string | null;
  seasons?: number;
  episodes?: number;
}

const MediaDetails: React.FC<MediaDetails> = ({
  name,
  runtime,
  director,
  writers,
  budget,
  revenue,
  homepage,
  countryNames,
  languageNames,
  seasons,
  episodes,
}) => {
  const renderDetailsField = (field: string, value: any) => (
    <MetaDataContainer>
      <FieldValue field={field} value={value} />
    </MetaDataContainer>
  );

  return (
    <Container>
      {renderDetailsField('Name', name)}
      {renderDetailsField('Director', director?.name)}
      {renderDetailsField('Writers', writers?.map(w => w.name)?.join(', '))}
      {!!runtime && renderDetailsField('Runtime', minutesConverter(runtime))}
      {renderDetailsField('Seasons', seasons)}
      {renderDetailsField('Episodes', episodes)}
      {!!budget && renderDetailsField('Budget', `$${budget.toLocaleString()}`)}
      {!!revenue && renderDetailsField('Revenue', `$${revenue.toLocaleString()}`)}
      {renderDetailsField('Languages', languageNames)}
      {renderDetailsField('Countries', countryNames)}
      {homepage && <ExternalLink href={homepage} text="Homepage" />}
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 4rem;
`;

const MetaDataContainer = styled.div`
  margin-bottom: 0.5rem;
`;

export default MediaDetails;
