import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Modal, Box, Grid, Avatar, TextField, Link, Card, CardMedia, CardActionArea } from '@mui/material'
import logo from '../assets/images/Room.me Logo White Crop.png';
import turtle from '../assets/images/turtle.png';
import cowboyturtle from '../assets/images/cowboy_turtle.jpg';
import LockIcon from '@mui/icons-material/Lock'
import "./houses.css"
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from 'react-router-dom';



const Houses = () => {
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const avatarStyle = { backgroundColor: '#97D8C4' }
   
    
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

                {Array.from({ length: 3 }).map((_, idx) => (
                    <CardActionArea component={RouterLink} to="/login">
                        <Card raised='true' sx={{ display: 'flex' }} style={{ marginBottom: "50px" }}>

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
                    </CardActionArea>

                ))}

            {/* <Button onClick={handleOpen}> 
                <Card >
                    <CardActionArea  >


                        <Card raised='true' sx={{ display: 'flex' }} style={{ marginBottom: "50px" }}>

                            <CardMedia
                                component="img"
                                style={{ height: "150px", width: "200px", paddingTop: "2%", alignItems: "left" }}
                                sx={{ width: 200 }}
                                image={cowboyturtle}>
                            </CardMedia>

                        </Card>
                        
                        <Modal
                            open={open}
                            onClose={handleClose}
                        >
                            <Box sx={style}>
                                <form>
                                    <Grid align='center'>
                                        <Avatar style={avatarStyle}><LockIcon /></Avatar>
                                        <h2>Sign up for Room.me!</h2>
                                    </Grid>
                                </form>
                            </Box>
                            
                        </Modal>
                    </CardActionArea>
                </Card>

                </Button> */}

            </div>
        </div>

    )


}

export default Houses