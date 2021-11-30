import { ClassNames } from '@emotion/react';
import { AppBar, Toolbar, Typography, Button, Modal, Box, Grid, Avatar, TextField, Link, IconButton } from '@mui/material'
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
import { useLocation } from 'react-router-dom';

const AlertPage = () => {
    // const location = useLocation();
    // const house = location.state.housename
    // console.log(house)
    // const useruid = location.state.username
    // console.log(location.state.username)
    // // var obj = JSON.parse(housename)
    // // housename = obj.house
    // const [housemates, setHousemates] = useState([]);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    // const [open, setOpen] = React.useState(false);
    // const [name, setAddedHouseMate] = useState('')

    return(
        <div>
            <AppBar style={{ background: '#6B9AC4' }} position="fixed">
                    <Toolbar display='flex'>
                        <img src={logo} width="125" height="50" flex />
                        <Typography type='Title' color='inherit' style={{ flex: 1 }} />

                        <IconButton style={{color: 'white'}} >
                            <OtherHousesIcon />
                        </IconButton>
                        <IconButton style={{color: 'white'}} >
                            <PlaylistAddCheckCircleIcon />
                        </IconButton>
                        <IconButton style={{color: 'white'}} >
                            <PersonIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
        </div>
    )
}
export default AlertPage