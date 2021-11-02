import React, { useState } from 'react'
import { Grid, Paper, Link, Avatar, TextField, Button, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import { typography } from '@mui/system'
import { CalendarViewDay } from '@mui/icons-material'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { initializeApp } from 'firebase/app'
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from 'react-router-dom';
import SignUpPage from './signup'



const LoginPage = () => {

    const firebaseConfig = {
        apiKey: "AIzaSyC1u5LF8UdxWJEkFB1k4y4iA4Njv1c8yck",
        authDomain: "cs-4800-project.firebaseapp.com",
        databaseURL: "https://cs-4800-project-default-rtdb.firebaseio.com",
        projectId: "cs-4800-project",
        storageBucket: "cs-4800-project.appspot.com",
        messagingSenderId: "90582600538",
        appId: "1:90582600538:web:66fbed6394f54ce7848163",
        measurementId: "G-KZ94TTK7E9"
    };

    const app = initializeApp(firebaseConfig);
    const paperStyle = { padding: 50, height: '250', width: 280, margin: "90px auto" }
    const avatarStyle = { backgroundColor: '#97D8C4' }
    const buttonStyle = { margin: '8px 0 ' }

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault() // prevent default makes it so the page doesn't refresh upon submission

        if (Email && Password) {
            var email = Email
            var pass = Password
            console.log(email, pass)

            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, pass)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockIcon /></Avatar>
                        <h2>Welcome to Room.me!</h2>
                        <h3>Sign in</h3>
                    </Grid>

                    <TextField
                        label='Email'
                        placeholder='Enter Email'
                        margin='normal'
                        fullWidth
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        label='Password'
                        placeholder='Enter Password'
                        type='password'
                        fullWidth
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                        style={buttonStyle}
                        fullWidth>
                        Sign Up
                    </Button>

                    <Router>
                        <Typography align='center'>
                            <Link href='/signup'>
                                Don't have an account?
                            </Link>
                        </Typography>

                        <Typography align='center'>
                            <Link href='#'>
                                Forgot password?
                            </Link>
                        </Typography>

                        {/* <Button component={RouterLink} to='/signup'>
                            Don't have an account?
                        </Button> */}
                    </Router>

                    <Switch>
                        <Route exact path="/signup">
                            <SignUpPage />
                        </Route>
                    </Switch>



                    {/* <Typography>
                        <Router>
                            <Link component={RouterLink} to ='/signup'>
                                Don't have an account?
                            </Link>
                        </Router>

                    </Typography> */}

                </form>
            </Paper>
        </Grid>
    )
}
export default LoginPage