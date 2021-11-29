import React from 'react'
import { AppBar, Toolbar, Typography, Button, Modal, Box, Grid, Avatar, TextField, Link, Card, CardMedia, CardActionArea, Stack, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import logo from '../assets/images/Room.me Logo White Crop.png';
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from 'react-router-dom';
import "./ToDoList2.css"

const ToDoList2 = () => {
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar display='flex'>
                    <img src={logo} width="125" height="50" flex />
                </Toolbar>
            </AppBar>
            <div className='Todo'>
                <Typography sx={{ fontSize: 35, fontWeight: 600 }}>
                    Todo List
                </Typography>

                <Typography>
                    Dummy House Name
                </Typography>
            </div>


            <div className='housemate'>
                <Typography sx={{ fontSize: 23 }}>Housemate 1 Name</Typography>
                <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                        <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                </FormGroup>
            </div>

            
        </div>

    );
}
export default ToDoList2