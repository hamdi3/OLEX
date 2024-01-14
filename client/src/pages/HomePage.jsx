import React from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import img1 from '../assets/air-max-270-mens-shoe-KkLcGR.png';
import Rating from '@mui/material/Rating';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
const HomePage = () => {
  const [value, setValue] = React.useState(2);
  return (
    <main className='home-page'>
      <Typography
        textAlign={'center'}
        variant='h2'
        component={'h2'}
        mt={10}
        mb={10}
      >
        Featured Products
      </Typography>
      <Grid
        container
        spacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        style={{
          height: '650px',
        }}
      >
        <Grid item xs={12} sm={4} style={{ height: '100%' }}>
          <Card style={{ height: '100%' }}>
            <CardMedia
              component='img'
              image={img1}
              title='green iguana'
              style={{ height: '80%' }}
            />
            <CardContent>
              <Typography gutterBottom variant='h3' component='div'>
                Lizard
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                component='h4'
                fontSize={12}
              >
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
              <Rating
                name='simple-controlled'
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} style={{ height: '100%' }}>
          <Card style={{ height: '100%' }}>
            <CardMedia
              component='img'
              image={img1}
              title='green iguana'
              style={{ height: '80%' }}
            />
            <CardContent>
              <Typography gutterBottom variant='h3' component='div'>
                Lizard
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                component='h4'
                fontSize={12}
              >
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
              <Rating
                name='simple-controlled'
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          style={{ height: '100%', background: 'none' }}
        >
          <Card style={{ height: '100%' }}>
            <CardMedia
              component='img'
              image={img1}
              title='green iguana'
              style={{ height: '80%' }}
            />
            <CardContent>
              <Typography gutterBottom variant='h3' component='div'>
                Lizard
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                component='h4'
                fontSize={12}
              >
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
              <Rating
                name='simple-controlled'
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          style={{ height: '100%', background: 'none' }}
        >
          <Card style={{ height: '100%' }}>
            <CardMedia
              component='img'
              image={img1}
              title='green iguana'
              style={{ height: '80%' }}
            />
            <CardContent>
              <Typography gutterBottom variant='h3' component='div'>
                Lizard
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                component='h4'
                fontSize={12}
              >
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
              <Rating
                name='simple-controlled'
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          style={{ height: '100%', background: 'none' }}
        >
          <Card style={{ height: '100%' }}>
            <CardMedia
              component='img'
              image={img1}
              title='green iguana'
              style={{ height: '80%' }}
            />
            <CardContent>
              <Typography gutterBottom variant='h3' component='div'>
                Lizard
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                component='h4'
                fontSize={12}
              >
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
              <Rating
                name='simple-controlled'
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          style={{ height: '100%', background: 'none' }}
        >
          <Card style={{ height: '100%' }}>
            <CardMedia
              component='img'
              image={img1}
              title='green iguana'
              style={{ height: '80%' }}
            />
            <CardContent>
              <Typography gutterBottom variant='h3' component='div'>
                Lizard
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                component='h4'
                fontSize={12}
              >
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
              <Rating
                name='simple-controlled'
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </main>
  );
};

export default HomePage;
