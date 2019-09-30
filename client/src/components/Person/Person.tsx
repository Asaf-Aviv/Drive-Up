import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
  Container, Typography, Box, Link,
} from '@material-ui/core';
import Gallery from 'react-photo-gallery';
import { requestPersonById } from '../../store/persons/actions';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import TabsPanel from '../TabsPanel';
import TMDB from '../../api';
import useStyles from './styles';
import Overview from '../Overview';
import MoviesList from '../MoviesList';
import ShowsList from '../ShowsList';

interface Params {
  personId: string;
}

const Person: React.FC<RouteComponentProps<Params>> = ({
  match: { params: { personId } },
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { byId: persons, byId: { loading, error } } = useShallowEqualSelector(
    state => state.persons
  );
  const [tabIndex, setTabIndex] = useState(0);

  const person = persons[+personId];

  useEffect(() => {
    setTabIndex(0);
  }, [personId]);

  useEffect(() => {
    if (!person && !loading && !error) {
      dispatch(requestPersonById(personId));
    }
  }, [dispatch, error, loading, person, personId]);

  if (loading) return <span>Loading</span>;

  if (!person) return <span>Movie Not Found</span>;

  console.log(person);

  const {
    name,
    biography,
    profile_path,
    images,
    birthday,
    homepage,
    movie_credits,
    tv_credits,
  } = person;

  return (
    <main>
      <Container>
        <Typography className={classes.title} color="secondary" variant="h3" component="h1">
          {name}
        </Typography>
        <Box className={classes.generalInfo} fontStyle="italic">
          {birthday && <Box>{`Born: ${birthday.replace(/-/g, '/')}`}</Box>}
          {homepage && (
            <Link
              color="secondary"
              rel="noopener noreferrer"
              target="_blank"
              href={homepage}
            >
              Homepage
            </Link>
          )}
        </Box>
        {/* <Box className={classes.generalInfo} fontStyle="italic">
          <Box component="span">{`Release Date:  ${release_date}`}</Box>
          {homepage && (
            <Link
              color="secondary"
              rel="noopener noreferrer"
              target="_blank"
              href={homepage}
            >
              Homepage
            </Link>
          )}
        </Box>
        <Box className={classes.generalInfo}>
          {!!budget && (
            <Box component="span">{`Budget: $${budget.toLocaleString()}`}</Box>
          )}
          {!!revenue && (
            <Box component="span">{`Revenue: $${revenue.toLocaleString()}`}</Box>
          )}
        </Box> */}
        <TabsPanel
          tabs={['Overview', 'Movies', 'Shows', 'Images']}
          activeTabIndex={tabIndex}
          setNextTab={setTabIndex}
        />
      </Container>
      {tabIndex === 0 && (
        <Overview
          backdrop_path={profile_path}
          title={name}
          genres={[]}
          overview={biography}
          mediaType="movies"
        />
      )}
      {tabIndex === 1 && (
        <>
          <Container>
            <MoviesList
              movies={movie_credits.cast}
              loading={false}
              error={false}
              isLastPage
            />
          </Container>
        </>
      )}
      {tabIndex === 2 && (
        <>
          <Container>
            <ShowsList
              shows={tv_credits.cast}
              loading={false}
              fetchNextPage={() => {}}
              error={false}
              isLastPage
            />
          </Container>
        </>
      )}
      {tabIndex === 3 && (
        <>
          <Gallery
            photos={images.profiles.map(i => ({
              ...i,
              src: `${TMDB.imgURL}/original/${i.file_path}`,
            }))}
          />
        </>
      )}
    </main>
  );
};

export default Person;
