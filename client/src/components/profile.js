import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Modal, Box, Grid, Avatar, TextField, Link, Card, CardMedia, CardActionArea, Stack } from '@mui/material'
import logo from '../assets/images/Room.me Logo White Crop.png';
import cowboyturtle from '../assets/images/cowboy_turtle.jpg';
import "./profile.css"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useLocation } from 'react-router-dom';
import Axios from 'axios';

//<Link to ='/href' ></Link>

import { useHistory } from "react-router-dom";

import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from 'react-router-dom';
import { bgcolor } from '@mui/system';

const Profile = () => {

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);
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
    const buttonStyle = { margin: '8px 0 ', backgroundColor: "#6B9AC4" }
    const [name, setChangeName] = useState('')


    const location = useLocation();
    console.log(location.state.username)
    const useruid = location.state.username
    const [userName, setName] = useState("");
    let history = useHistory();

    function getName() {
        Axios.post('http://localhost:3001/getName', {
            useruid: useruid
        }).then((response) => {
            setName(response.data)
        });
    }

    //const auth = getAuth();
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //       // User is signed in, see docs for a list of available properties
    //       // https://firebase.google.com/docs/reference/js/firebase.User
    //       const uid = user.uid;
    //       console.log(uid);
    //       const userCheck = auth.currentUser.email;
    //       console.log(userCheck);
    //       // ...
    //     } else {

    //     history.push('/');
    //       // User is signed out
    //       // ...
    //     }
    //   });

    // auth.onAuthStateChanged(function(user) {
    // if (user) {
    //     // User is signed in.
    // }
    // });

    //const userName = "hi"
    //const userName = String(auth.currentUser.email)


    return (
        <div>
            <AppBar style={{ background: '#6B9AC4' }} position="fixed">
                <Toolbar display='flex'>
                    <img src={logo} width="125" height="50" flex />
                </Toolbar>
            </AppBar>
            <div className="avatar">
                <Avatar sx={{ height: '190px', width: '190px', backgroundColor: "#4059AD"}}>
                    <Typography variant="h1">
                    {userName[0]}
                    </Typography>
                </Avatar>

            </div>

            <div className="welcomeText">
                <Button onClick={getName}> Name </Button>
                <h1> Welcome {userName}! </h1>
            </div>

            <div className="button">
                <Stack spacing={4} sx={{ width: '190px' }}>
                    <Button onClick={handleOpen} variant='contained' style={{ minHeight: '80px', minWidth: '450px', fontSize: '20px', backgroundColor: "#6B9AC4" }}>
                        Change Name
                    </Button>

                    <Modal open={open} onClose={handleClose}>
                        <Box sx={style}>
                            <form noValidate autoComplete='off'>
                                <Grid align='center'>
                                    <h2>Change Name</h2>
                                </Grid>
                                <TextField
                                    label='Change Name'
                                    placeholder='Enter Name'
                                    margin='normal'
                                    fullWidth
                                    required
                                    onChange={(e) => setChangeName(e.target.value)}
                                />

                                <Button
                                    type='submit'
                                    color='primary'
                                    variant='contained'
                                    style={buttonStyle}
                                    fullWidth>
                                    Change Name
                                </Button>
                            </form>
                        </Box>
                    </Modal>

                    <Button variant='contained' style={{ minHeight: '80px', minWidth: '450px', fontSize: '20px', backgroundColor: "#6B9AC4"}}>
                        Leave House
                    </Button>

                    <Button variant='contained' onClick={() => history.push({ pathname: "/houses", state: { id: 1, username: useruid } })} style={{ minHeight: '80px', minWidth: '450px', fontSize: '20px', backgroundColor: "#6B9AC4" }}>
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