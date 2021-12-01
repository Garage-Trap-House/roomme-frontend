import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Modal, Box, Grid, Avatar, TextField, Link, Card, CardMedia, CardActionArea, CardHeader, Fab } from '@mui/material'
import logo from '../assets/images/Room.me Logo White Crop.png';
import turtle from '../assets/images/turtle.png';
import Axios from 'axios';
import cowboyturtle from '../assets/images/cowboy_turtle.jpg';
import LockIcon from '@mui/icons-material/Lock'
import "./houses.css"
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AddIcon from '@mui/icons-material/Add';

const Houses = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [houses, setHouse] = useState([]);
    const avatarStyle = { backgroundColor: '#97D8C4' }

    const location = useLocation();
    const useruid = location.state.username
    console.log(useruid)

    // const auth = getAuth();
    // const email = String(auth.currentUser.email);

    // const userid = auth.currentUser.uid;


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

    const[houseName, setHouseName] = useState('')

    function getHouses() {
        Axios.post('http://localhost:3001/checkHouses', {
            useruid:useruid
        }).then((response) => {
            setHouse(response.data)
        });
    }

    function createHouse() {
        Axios.post('http://localhost:3001/createHouse', {
            useruid:useruid,
            housename:houseName
        }).then((response) => {
            setHouse(response.data)
        });
        setOpen(false);
    }

    return (
        <div>
            <AppBar style={{ background: '#6B9AC4' }} position="fixed">
                <Toolbar display='flex'>
                    <img src={logo} width="125" height="50" flex />

                </Toolbar>
            </AppBar>
            <div className="Houses">
                <Button onClick={getHouses}> Houses </Button>
                <Typography variant='h3'>
                    Houses
                </Typography>
                {houses.map((house) =>
                    <CardActionArea component={RouterLink} to={{ pathname: "/housemates", state: { id: 1, housename: house , username: useruid } }} >

                        <Card raised='true' sx={{ display: 'flex' }} style={{ marginBottom: "50px" }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ backgroundColor: "#F4B942", width: 75, height: 75, }} aria-label="person">
                                        {house[0] + house[1]}
                                    </Avatar>
                                    }
                                    titleTypographyProps={{variant: 'h2'}}
                                    title={house}
                                />
                            {/* <CardMedia
                                component="img"
                                style={{ height: "150px", width: "200px", paddingTop: "2%", alignItems: "left" }}
                                sx={{ width: 200 }}
                                image={turtle}>
                            </CardMedia> */}
                        </Card>
                    </CardActionArea>)}



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

            <div>
                <Fab style={{background: '#6B9AC4', position: 'fixed', bottom: 16, right: 16,}}variant='contained' onClick={handleOpen}>
                    <AddIcon style={{color: "white"}}/>
                </Fab>

                <Modal open={open} onClose={handleClose}>
                    <Box sx={style}>
                        <Grid align='center'>
                            <h2>Add House</h2>
                        </Grid>
                        <TextField
                            label='House Name'
                            placeholder='Enter House Name'
                            margin='normal'
                            fullWidth
                            required
                            onChange={(e) => setHouseName(e.target.value)}
                            />
                        <Button onClick = {createHouse}> Submit </Button>
                    </Box>
                </Modal>

            </div>
        </div>

    )


}

export default Houses