import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Modal, Box, Grid, Avatar, TextField, Link, Card, CardMedia } from '@mui/material'
import logo from '../assets/images/Room.me Logo White Crop.png';
import turtle from '../assets/images/turtle.png';
import "./houses.css"


const Houses = () => {
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar display='flex'>
                    <img src={logo} width="125" height="50" flex />




                </Toolbar>
            </AppBar>
            <div className="Houses">
                <Typography variant='h3'>
                    Houses
                </Typography>

                <Card raised='true' sx={{ display: 'flex' }}>
                    <CardMedia
                        component="img"
                        style={{ height: "150px", width: "200px", paddingTop: "2%", alignItems: "left" }}
                        sx={{ width: 200 }}
                        image={turtle}>
                    </CardMedia>

                    <Box>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Mac Miller
                        </Typography>
                    </Box>

                </Card>

            </div>
        </div>

    )


}

export default Houses