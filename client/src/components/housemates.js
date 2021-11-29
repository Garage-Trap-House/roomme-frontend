import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton, Modal, Box, Grid, Avatar, TextField, Link, Card, CardMedia, CardActionArea, Stack, AvatarGroup } from '@mui/material'
import logo from '../assets/images/Room.me Logo White Crop.png';
import cowboyturtle from '../assets/images/cowboy_turtle.jpg';
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from 'react-router-dom';
import "./housemates.css"
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import { Style } from '@mui/icons-material';

const HouseMates = () => {

    const location = useLocation();
    const house = location.state.name
    const housename = house.house
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
            housename: housename
        }).then((response) => {
            //houses = response.data
            setHousemates(response.data)
        });
    }



    return (
        <div>
            <AppBar position="fixed">
                <Toolbar display='flex'>
                    <img src={logo} width="125" height="50" flex />
                    <Typography type='Title' color='inherit' style={{ flex: 1 }} />

                    <IconButton href='/todo'>
                        <PlaylistAddCheckCircleIcon />
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
                        <Grid item>
                            <Avatar alt="Cowboy Turtle" sx={{ height: '190px', width: '190px', marginBottom: '30px', marginRight: '20px' }} src={cowboyturtle} />
                        </Grid>
                        <Grid item>
                            <Typography style={{ fontSize: 18 }}>
                                {housemate}
                            </Typography>
                        </Grid>
                    </Grid>
                )}

            </div>
            <div className='addButton'>
                <Button onClick={handleOpen} variant='contained'>+</Button>
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