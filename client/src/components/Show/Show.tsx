import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
  Typography,
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
} from '@material-ui/core';
import Gallery from 'react-photo-gallery';
import { requestShowById, requestRelatedShows } from '../../store/shows/actions';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import useStyles from './styles';
import Overview from '../Overview';
import TabsPanel from '../TabsPanel';
import Companies from '../Companies';
import TMDB from '../../api';
import ShowsList from '../ShowsList';
import Videos from '../Videos/Videos';
import CelebTile from '../CelebTile';

interface Params {
  showId: string;
}

const Show: React.FC<RouteComponentProps<Params>> = ({
  match: { params: { showId } },
}) => {
  const { byId: shows, byId: { loading, error } } = useShallowEqualSelector(state => state.shows);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);

  const show = shows[+showId];

  useEffect(() => {
    if (!show && !loading && !error) {
      dispatch(requestShowById(showId));
    }
  }, [dispatch, error, loading, show, showId]);

  if (loading) return <span>Loading</span>;

  if (!show) return <span>Show Not Found</span>;

  const {
    name: title,
    backdrop_path,
    genres,
    overview,
    production_companies: companies,
    networks,
    seasons,
    created_by,
    similar,
    recommendations,
    images,
    videos,
  } = show;

  return (
    <main>
      <Container>
        <Typography className={classes.title} variant="h3" component="h1">
          {title}
        </Typography>
        <TabsPanel
          tabs={['Overview', 'Seasons', 'Similar', 'Recommended', 'Images', 'Videos']}
          activeTabIndex={tabIndex}
          setNextTab={setTabIndex}
        />
      </Container>
      {tabIndex === 0 && (
        <>
          <Overview
            title={title}
            backdrop_path={backdrop_path}
            genres={genres}
            overview={overview}
            mediaType="shows"
          />
          <Container>
            <Typography className={classes.title} variant="h4">Created By</Typography>
            <Box className={classes.producers}>
              {created_by.map(producer => (
                <CelebTile
                  key={producer.id}
                  id={producer.id}
                  name={producer.name}
                  image={producer.profile_path}
                />
              ))}
            </Box>
          </Container>
          <Companies companies={networks} title="Networks" />
          <Companies companies={companies} />
        </>
      )}
      {tabIndex === 1 && (
        <Container>
          <Box className={classes.seasonsContainer}>
            {seasons.map(s => (
              <Card key={s.name}>
                <CardHeader
                  color="textSecondary"
                  title={
                    <Typography
                      color="secondary"
                      variant="h5"
                      align="center"
                      gutterBottom
                    >
                      {s.name}
                    </Typography>
                  }
                  subheader={
                    <Box display="flex" justifyContent="space-around" fontStyle="italic">
                      <span>{`Air Date: ${s.air_date.replace(/-/g, '/')}`}</span>
                      <span>{`Episodes: ${s.episode_count}`}</span>
                    </Box>
                  }
                />
                <CardMedia
                  component="img"
                  alt={`${title} ${s.name}`}
                  height="300"
                  image={`https://image.tmdb.org/t/p/w300/${s.poster_path}`}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {s.overview}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      )}
      {tabIndex === 2 && (
        <>
          <Container>
            <Typography align="right" color="textSecondary">
              <em>{`Showing ${similar.results.length} of ${similar.total_results} Results`}</em>
            </Typography>
            <ShowsList
              shows={similar.results}
              fetchNextPage={() => dispatch(
                requestRelatedShows(show.id, 'similar', similar.page + 1)
              )}
              loading={similar.loading}
              error={similar.error}
              isLastPage={similar.page === similar.total_pages}
            />
          </Container>
        </>
      )}
      {tabIndex === 3 && (
        <>
          <Container>
            <Typography align="right" color="textSecondary">
              <em>
                {`Showing ${recommendations.results.length} 
                  of ${recommendations.total_results} Results`}
              </em>
            </Typography>
            <ShowsList
              shows={recommendations.results}
              fetchNextPage={() => dispatch(
                requestRelatedShows(show.id, 'recommendations', recommendations.page + 1)
              )}
              loading={recommendations.loading}
              error={recommendations.error}
              isLastPage={recommendations.page === recommendations.total_pages}
            />
          </Container>
        </>
      )}
      {tabIndex === 4 && (
      <>
        <Gallery
          photos={images.backdrops.map(i => ({
            ...i,
            src: `${TMDB.imgURL}/original/${i.file_path}`,
          }))}
        />
        <Gallery
          photos={images.posters.map(i => ({
            ...i,
            src: `${TMDB.imgURL}/original/${i.file_path}`,
          }))}
        />
      </>
      )}
      {tabIndex === 5 && <Videos videos={videos.results} />}
    </main>
  );
};

export default Show;
