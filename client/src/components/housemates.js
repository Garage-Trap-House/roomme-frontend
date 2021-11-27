import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton, Modal, Box, Grid, Avatar, TextField, Link, Card, CardMedia, CardActionArea, Stack, AvatarGroup } from '@mui/material'
import logo from '../assets/images/Room.me Logo White Crop.png';
import cowboyturtle from '../assets/images/cowboy_turtle.jpg';
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from 'react-router-dom';
import "./housemates.css"
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';

const HouseMates = () => {
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar display='flex'>
                    <img src={logo} width="125" height="50" flex />
                    <Typography type='Title' color='inherit' style={{ flex: 1 }} />

                    <IconButton href='/todo'>
                        <PlaylistAddCheckCircleIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <div className='HousematesText'>
                <Typography style={{ fontWeight: 600, fontSize: 45 }}>
                    Housemates
                </Typography>
            </div>

            <div className='avatars'>
                <Grid container direction="row" alignItems='center'>
                    <Grid item>
                        <Avatar alt="Cowboy Turtle" sx={{ height: '190px', width: '190px', marginBottom: '30px', marginRight: '20px' }} src={cowboyturtle} />
                    </Grid>
                    <Grid item>
                        <Typography style={{ fontSize: 18 }}>
                            Person #1 Name
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems='center'>
                    <Grid item>
                        <Avatar alt="Cowboy Turtle" sx={{ height: '190px', width: '190px', marginBottom: '30px', marginRight: '20px' }} src={cowboyturtle} />
                    </Grid>
                    <Grid item>
                        <Typography style={{ fontSize: 18 }}>
                            Person #2 Name
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems='center'>
                    <Grid item>
                        <Avatar alt="Cowboy Turtle" sx={{ height: '190px', width: '190px', marginBottom: '30px', marginRight: '20px' }} src={cowboyturtle} />
                    </Grid>
                    <Grid item>
                        <Typography style={{ fontSize: 18 }}>
                            Person #3 Name
                        </Typography>
                    </Grid>
                </Grid>

            </div>
        </div>

    );

}
export default HouseMates