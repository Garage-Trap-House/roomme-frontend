import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton, Modal, Box, Grid, Avatar, TextField, Link, Card, CardMedia, CardActionArea, Stack, AvatarGroup } from '@mui/material'
import logo from '../assets/images/Room.me Logo White Crop.png';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import PersonIcon from '@mui/icons-material/Person';
import cowboyturtle from '../assets/images/cowboy_turtle.jpg';
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from 'react-router-dom';
import "./housemates.css"
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import { Style } from '@mui/icons-material';

const HouseMates = () => {

    const location = useLocation();
    const house = location.state.housename
    console.log(house)
    const useruid = location.state.username
    console.log(location.state.username)
    // var obj = JSON.parse(housename)
    // housename = obj.house
    const [housemates, setHousemates] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = React.useState(false);
    const [name, setAddedHouseMate] = useState('')

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

    function getHousemates() {
        Axios.post('http://localhost:3001/getHousemates', {
            housename: house
        }).then((response) => {
            //houses = response.data
            setHousemates(response.data)
        });
    }



    return (
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
                        <PersonIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <div className='HousematesText'>
                <Button onClick={getHousemates}> Housemates </Button>
                <Typography style={{ fontWeight: 600, fontSize: 45 }}>
                    Housemates
                </Typography>
            </div>

            <div className='avatars'>
                {housemates.map((housemate) =>
                
                    <Grid container direction="row" alignItems='center'>
                        <Button component={RouterLink} to={{ pathname: "/todo", state: { id: 1, username: useruid, todouser: housemate, housename: house} }}>
                        <Grid item>
                            <Avatar alt="Cowboy Turtle" sx={{ height: '190px', width: '190px', marginBottom: '30px', marginRight: '20px' }} src={cowboyturtle} />
                        </Grid>
                        <Grid item>
                            <Typography style={{ fontSize: 18 }}>
                                {housemate}
                            </Typography>
                        </Grid>
                        </Button> 
                    </Grid>
               
                )}

            </div>
            <div className='addButton'>
                <Button style={{backgroundColor: "#6B9AC4"}} onClick={handleOpen} variant='contained'>+</Button>
                <Modal open={open} onClose={handleClose}>
                    <Box sx={style}>
                        <Grid align = 'center'>
                            <h2>Add House</h2>
                        </Grid>
                        <TextField
                        label='House Name'
                        placeholder='Enter House Name'
                        margin = 'normal'
                        fullWidth
                        required
                        onChange={(e) => setAddedHouseMate(e.target.value)}
                        />
                    </Box>
                </Modal>
            </div>
        </div>

    );

}
export default HouseMates