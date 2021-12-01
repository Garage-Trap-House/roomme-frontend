import { ClassNames } from '@emotion/react';
import { AppBar, Toolbar, Typography, Button, Modal, Box, Grid, Avatar, TextField, Link, IconButton, Card, CardHeader, CardContent, autocompleteClasses, Fab} from '@mui/material'
import { useTheme } from '@mui/private-theming'
//import React from 'react'
import Axios from 'axios';
import logo from '../assets/images/Room.me Logo White Crop.png';
import React, { useState } from 'react'
import * as firebase from "firebase/app"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence} from "firebase/auth"
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from 'react-router-dom';
import Profile from './profile';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import {withRouter} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import PersonIcon from '@mui/icons-material/Person';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { AlignHorizontalLeft, AlignHorizontalRight, Block, ElectricMoped } from '@mui/icons-material';

const AlertPage = () => {
    const location = useLocation();
    const house = location.state.housename
    console.log(house)
    const useruid = location.state.username
    console.log(location.state.username)
    // var obj = JSON.parse(housename)
    // housename = obj.house
    const [housemates, setHousemates] = useState([]);
    const [name, setAddedHouseMate] = useState('')

    //Modal Code
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Modal Styling
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        p: 4,
      };

    //Data
    const data = [
        {id: 1, user: "Vincent", title: "Hey guys don't forget to take out the trash!", date: "November 14, 2021"},
        {id: 2, user: "Vincent", title: "I got a shawty coming over.", date: "November 21, 2021"},
    ]

    return(
        <div>
            <AppBar style={{ background: '#6B9AC4' }} position="fixed">
                    <Toolbar display='flex'>
                        <img src={logo} width="125" height="50" flex />
                        <Typography type='Title' color='inherit' style={{ flex: 1 }} />

                        <IconButton style={{color: 'white'}} component={RouterLink} to={{ pathname: "/houses", state: { id: 1, housename: house , username: useruid } }}>
                            <OtherHousesIcon />
                        </IconButton>
                        <IconButton style={{color: 'white'}} component={RouterLink} to={{ pathname: "/todo", state: { id: 1, housename: house , username: useruid } }}>
                            <PlaylistAddCheckCircleIcon />
                        </IconButton>
                        <IconButton style={{color: 'white'}} component={RouterLink} to={{ pathname: "/alerts", state: { id: 1, housename: house , username: useruid } }}>
                            <NotificationsIcon />
                        </IconButton>
                        <IconButton style={{color: 'white'}} component={RouterLink} to={{ pathname: "/profile", state: { username: useruid } }}>
                            {/* Add on on click property that deletes an alert if its THAT USERS ALERT. */}
                            <PersonIcon />
                        </IconButton>
                    </Toolbar>
            </AppBar>
            <div style={{display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "100px", width: "50%",}}>
                {data.map(elem => (
                <Grid container spacing={1} key={data.indexOf(elem)}>
                    <Card sx={{ width: 1000, margin: 1 }}>
                    <CardHeader
                        avatar={
                        <Avatar sx={{ backgroundColor: "#4059AD", width: 50, height: 50, }} aria-label="person">
                            {/* User's first letter of their name is displayed as a pfp. */}
                            {elem.user[0]}
                        </Avatar>
                        }
                        action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                        titleTypographyProps={{variant: 'h4'}}
                        title={elem.title}
                        subheaderTypographyProps={{variant: 'subtitle1'}}
                        subheader={"Posted By: " + elem.user + " on " + elem.date}
                        
                    />
                    </Card>
                </Grid>
                ))}
            </div>

            <div>
                <Fab style={{background: '#6B9AC4', position: 'fixed', bottom: 16, right: 16,}} aria-label="add" onClick={handleOpen}>
                    <AddIcon style={{color: "white"}}/>
                </Fab>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom="10px">
                    Add an alert.
                </Typography>
                {/* User posts an alert. */}
                <TextField id="outlined-basic" label="Alert" variant="outlined" fullWidth/>

                {/* Submit Button */}
                <Button style={{position: 'relative', left: 340, top: 10}}>
                    Submit
                </Button>
                </Box>
            </Modal>
        </div>
    )
}
export default AlertPage