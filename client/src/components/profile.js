import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Modal, Box, Grid, Avatar, TextField, Link, Card, CardMedia, CardActionArea, Stack } from '@mui/material'
import logo from '../assets/images/Room.me Logo White Crop.png';
import cowboyturtle from '../assets/images/cowboy_turtle.jpg';
import "./profile.css"
import { getAuth, onAuthStateChanged } from "firebase/auth"

//<Link to ='/href' ></Link>

import { useHistory } from "react-router-dom";

import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from 'react-router-dom';

const Profile = () => {

    let history = useHistory();
    const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              console.log(uid);
              const userCheck = auth.currentUser.email;
              console.log(userCheck);
              // ...
            } else {

            history.push('/');
              // User is signed out
              // ...
            }
          });

        // auth.onAuthStateChanged(function(user) {
        // if (user) {
        //     // User is signed in.
        // }
        // });

    const userName = String(auth.currentUser.email)


    return (
        <div>
            <AppBar position="fixed">
                <Toolbar display='flex'>
                    <img src={logo} width="125" height="50" flex />
                </Toolbar>
            </AppBar>
            <div className="avatar">
                <Avatar sx={{ height: '190px', width: '190px' }} src={cowboyturtle} />
                <h1> Welcome {userName}! </h1>
            </div>

            <div className="button">
                <Stack spacing={4} sx={{ width: '190px' }}>                    
                    <Button variant='contained' style={{ minHeight: '80px', minWidth: '450px', fontSize: '20px' }}>
                        Change Name
                    </Button>

                    <Button variant='contained' style={{ minHeight: '80px', minWidth: '450px', fontSize: '20px' }}>
                        Leave House
                    </Button>

                    <Button variant='contained'  onClick={() => {history.push("/houses");}} style={{ minHeight: '80px', minWidth: '450px', fontSize: '20px' }}>
                        Houses
                    </Button>

                    <div className='logoutButton'>
                        <Button variant='contained' style={{ fontSize: '20px', backgroundColor: '#97D8C4', color: "#FFFFFF", minHeight: '80px', minWidth: '350px' }}>
                            Sign Out
                        </Button>
                    </div>

                </Stack>

            </div>
        </div>
    )
}
export default Profile