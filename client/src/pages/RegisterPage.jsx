import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {
  Button,
  CssBaseline,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Paper,
} from '../mui';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const RegisterPage = () => {
  //  state for user Input
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    username: '',
    email: '',
    password: '',
    seller: false,
  });

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
    username: '',
  });

  const validateInputs = () => {
    let valid = true;
    const newErrors = { ...errors }; // Copy existing errors

    // Basic validation rules
    if (formData.first_name.trim() === '') {
      newErrors.first_name = 'First name is required';
      valid = false;
    } else {
      newErrors.first_name = '';
    }

    if (formData.last_name.trim() === '') {
      newErrors.last_name = 'Last name is required';
      valid = false;
    } else {
      newErrors.last_name = '';
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    } else {
      newErrors.email = '';
    }

    if (formData.password.trim() === '') {
      newErrors.password = 'Password is required';
      valid = false;
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors); // Update errors
    return valid;
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleInputSubmit = (event) => {
    event.preventDefault();
    const isValid = validateInputs();

    if (isValid) {
      console.log(formData); // Proceed with form submission or other actions
      axios
        .post(
          'http://127.0.0.1:8000/users_api/register/',
          { formData },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  };

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <form onSubmit={handleInputSubmit}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='first_name'
                label='First Name'
                name='first_name'
                autoComplete='first_name'
                autoFocus
                value={formData.first_name}
                onChange={handleInputChange}
                error={!!errors.first_name}
                helperText={errors.first_name}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='last_name'
                label='Last Name'
                name='last_name'
                autoComplete='last_name'
                value={formData.last_name}
                onChange={handleInputChange}
                error={!!errors.last_name}
                helperText={errors.last_name}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='address'
                label='Address'
                name='address'
                autoComplete='address'
                value={formData.address}
                onChange={handleInputChange}
                error={!!errors.address}
                helperText={errors.address}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
              />

              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='/login' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </form>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
