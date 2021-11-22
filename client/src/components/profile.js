import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Modal, Box, Grid, Avatar, TextField, Link, Card, CardMedia, CardActionArea, Stack } from '@mui/material'
import logo from '../assets/images/Room.me Logo White Crop.png';
import cowboyturtle from '../assets/images/cowboy_turtle.jpg';
import "./profile.css"



const Profile = () => {
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar display='flex'>
                    <img src={logo} width="125" height="50" flex />
                </Toolbar>
            </AppBar>
            <div className="avatar">
                <Avatar sx={{ height: '190px', width: '190px' }} src={cowboyturtle} />
            </div>

            <div className="button">
                <Stack spacing={4} sx={{ width: '190px' }}>
                    <Button variant='contained' style={{ minHeight: '80px', minWidth: '450px', fontSize: '20px' }}>
                        Change Name
                    </Button>

                    <Button variant='contained' style={{ minHeight: '80px', minWidth: '450px', fontSize: '20px' }}>
                        Leave House
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