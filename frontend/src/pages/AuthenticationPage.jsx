import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext';
import { Snackbar } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const defaultTheme = createTheme();

export default function AuthenticationPage() {
    let [username,setUsername]=React.useState('')
    let [password,setPassword]=React.useState('')
    let [name,setName]=React.useState('')
    let [error,setError]=React.useState('')
    let [message,setMessage]=React.useState('')
    let [formState,setFormState]=React.useState('login')
    let [open ,setOpen]=React.useState(false)
    const {handleRegister,handleLogin}=React.useContext(AuthContext);
    let handleAuth= async()=>{
    try{
        if(formState=='login'){
            const result=await handleLogin(username,password);
            setMessage(result);
            if(error){
              setError("");
            }
        }
        if(formState=='signup'){
            const result=await handleRegister(name,username,password)
            setMessage(result);
            setOpen(true);
            setFormState('login');
            setPassword('');
            if(error){
              setError("");
            }
        }
    }
    catch(error){
      let message=error.response.data.message;
      setError(message);
        
    }
  }
  let handleOnclose=()=>{
    setOpen(false);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/signIn.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <div>
                <Button variant={formState=='login'?'contained':""} onClick={()=>{setFormState('login')}}> Login</Button>
                <Button variant={formState=='signup'?'contained':""} onClick={()=>{setFormState('signup')}}>Sign Up</Button>
            </div>
            <Box component="form" noValidate  sx={{ mt: 1 }}>
                {formState=='signup'&&
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(e)=>{setName(e.target.value)}}
              /> 
                }
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoFocus
                onChange={(e)=>{setUsername(e.target.value)}}
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
                onChange={(e)=>{setPassword(e.target.value)}}
              />
              <p style={{color:"red"}}>{error}</p>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formState=='login'?'Login':'Register'}
            
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={
        4000} message={message}
        onClose={handleOnclose} 
        />
      
    </ThemeProvider>
  );
}