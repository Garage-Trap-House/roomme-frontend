import { ClassNames } from '@emotion/react';
import { AppBar, Toolbar, Typography, Button, Modal, Box, Grid, Avatar, TextField, Link } from '@mui/material'
import { useTheme } from '@mui/private-theming'
//import React from 'react'
import Axios from 'axios';
import logo from '../assets/images/Room.me Logo White Crop.png';
import React, { useState } from 'react'
import LockIcon from '@mui/icons-material/Lock'
import * as firebase from "firebase/app"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence} from "firebase/auth"
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from 'react-router-dom';
import Profile from './profile';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import {withRouter} from 'react-router-dom';
import { useHistory } from "react-router-dom";


const HomePage = () => {

    let history = useHistory();
    const theme = useTheme()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const avatarStyle = { backgroundColor: '#97D8C4' }
    const buttonStyle = { margin: '8px 0 ' }

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const firebaseConfig = {
        apiKey: "AIzaSyC1u5LF8UdxWJEkFB1k4y4iA4Njv1c8yck",
        authDomain: "cs-4800-project.firebaseapp.com",
        //databaseURL: "https://cs-4800-project-default-rtdb.firebaseio.com",
        projectId: "cs-4800-project",
        storageBucket: "cs-4800-project.appspot.com",
        messagingSenderId: "90582600538",
        appId: "1:90582600538:web:66fbed6394f54ce7848163",
        measurementId: "G-KZ94TTK7E9"
      };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    

    const handleSignUpSubmit = (e) => {
        e.preventDefault() // prevent default makes it so the page doesn't refresh upon submission

        if (Email && Password) {
            var email = Email
            var password = Password
            console.log(email, password)

            const auth = getAuth();

            createUserWithEmailAndPassword(auth,email, password)
            .then((userCredential) => {
                // Signed in 
                //createAccount();
                const user = userCredential.user;
                const userid = user.uid
                //history.push('/profile');
                history.push({pathname:"/profile", state:{id:1,name:userid}})
                //console.log("User ID :- ", user.uid);
                // ...

                Axios.post('http://localhost:3001/createAccount', {
                         email, 
                         password,
                         userid,
                        }).then(()=>{
                        console.log("success")
            });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

            setPersistence(auth, browserSessionPersistence)
            .then(() => {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            return signInWithEmailAndPassword(auth, email, password);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        }
    }
    
    const handleLoginSubmit = (e) => {
        e.preventDefault() // prevent default makes it so the page doesn't refresh upon submission

        if (Email && Password) {
            var email = Email
            var password = Password
            console.log(email, password)

            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("success");
                    //history.push('/profile');
                    const userid = user.uid
                    history.push({pathname:"/profile", state:{id:1,name:userid}})
                    //this.props.history.push('/profile');
                    
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        
            setPersistence(auth, browserSessionPersistence)
            .then(() => {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            return signInWithEmailAndPassword(auth, email, password);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        }
    }

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar display='flex'>
                    <img src={logo} width="125" height="50" flex />

                    <Typography type='Title' color='inherit' style={{ flex: 1 }} />
                    {/*<Button color="inherit" href="/login">Login</Button>
                    <Button color="inherit" href ="/signup">Sign Up</Button>*/}
                    
                    <Button onClick={handleOpen} color="inherit">Sign Up</Button>
                        <Modal open={open} onClose={handleClose}>

                        <Box sx={style}>
                            <form noValidate autoComplete='off' onSubmit={handleSignUpSubmit}>
                                <Grid align='center'>
                                    <Avatar style={avatarStyle}><LockIcon /></Avatar>
                                    <h2>Sign up for Room.me!</h2>
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
                                    Create Account
                                    
                                </Button>
                            </form>
                        </Box>
                    </Modal>

                    <Button onClick={handleOpen1} color="inherit">Login</Button>
                        <Modal
                            open={open1}
                            onClose={handleClose1}
                        >

                        <Box sx={style}>
                            <form noValidate autoComplete='off' onSubmit={handleLoginSubmit}>
                            <Grid align='center'>
                        <Avatar style={avatarStyle}><LockIcon /></Avatar>
                        <h2>Welcome to Room.me!</h2>
                        <h3>Sign In</h3>
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
                        onClick={() => { console.log('onClick'); }}
                        type='submit'
                        color='primary'
                        variant='contained'
                        style={buttonStyle}
                        fullWidth>
                        Login
                        {/* <Router>
                            <Link component={RouterLink} to ='/profile'>
                            </Link>
                            </Router> */}
                    </Button>

                    

                            </form>
                        </Box>
                    </Modal>
            
                    
                </Toolbar>
            </AppBar>

            

            
            <div class='text' style={{marginTop:300, justifyContent:'center', alignItems:'center'}} >
                <Typography variant='h1'>
                    Welcome to Room.me! 
                </Typography>
                
                <Typography variant='h1'>
                    Here to solve all your roommate issues. 
                </Typography>
            </div>
            

        </div>


    )
}
export default withRouter(HomePage)