import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {pink} from '@mui/material/colors';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Upgrad
      </Link>{' '}
      {new Date().getFullYear()-2}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function MySignIn() {
  const color = pink[500];
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var signInRequestData = {
      username: data.get('email'),
      password: data.get('password'),
    };
    userSignInRequest(signInRequestData);
  };

  const userSignInRequest = async(signInRequestData) => {
    const SIGNIN_URL = "http://localhost:8080/api/auth/signin";
    console.log("SignIn Data :: ");
    console.log(signInRequestData);
    sessionStorage.setItem('user',signInRequestData.username);
    try{
      var response = await axios.post(SIGNIN_URL, signInRequestData);
      console.log(response.data);
      sessionStorage.setItem("token", response.data.token);
      notify('success');
      setTimeout(()=>{
        window.location.replace("/dashboard");
      },1000)
    }catch(err){
      notify('error');
      console.log(err.response);
    }
    console.log("Session Storage Token :: "+ sessionStorage.getItem("token"));
  }

  const notify = (str) => {
    if (str === 'success') {
      toast.success("Login Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        icon: false
      });
    }
    if (str === 'error') {
      toast.error("Please check credentials", {
        position: toast.POSITION.TOP_RIGHT,
        icon: false
      });
    }
  }
 
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: color }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ background: '#3f51b5' }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <ToastContainer theme="colored" autoClose={10000} hideProgressBar={false} pauseOnHover/>
    </ThemeProvider>
  );
}