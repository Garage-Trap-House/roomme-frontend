import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Modal, Box, Grid, Avatar, TextField, Link, Card, CardMedia, CardActionArea, Stack, Checkbox, FormControlLabel, FormGroup, IconButton } from '@mui/material'
import logo from '../assets/images/Room.me Logo White Crop.png';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import PersonIcon from '@mui/icons-material/Person';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import "./ToDoList2.css"
import { useHistory } from "react-router-dom";

const ToDoList2 = () => {
    let history = useHistory();
    const location = useLocation();
    const house = location.state.housename
    const useruid = location.state.username
    const userToDo = location.state.todouser
    const [todoList, setToDo] = useState([]);
    const [userName, setName] = useState("");
    //history.go(0)


    function getToDo() {
        Axios.post('http://localhost:3001/getChores', {
            housename: house,
            name: userToDo
        }).then((response) => {
            //houses = response.data
            setToDo(response.data)
            console.log(todoList)
        });
    }

    function getName() {
        Axios.post('http://localhost:3001/getName', {
            useruid: useruid
        }).then((response) => {
            setName(response.data)
        });
        history.push({pathname:"/todo", state:{id:1, username:useruid, todouser: userName, housename: house}})

    }
    // 
    

    return (
        <div>
            <AppBar style={{ background: '#6B9AC4' }} position="fixed">
            <Toolbar display='flex'>
                    <img src={logo} width="125" height="50" flex />
                    <Typography type='Title' color='inherit' style={{ flex: 1 }} />

                    <IconButton style={{color: 'white'}} component={RouterLink} to={{ pathname: "/houses", state: { id: 1, housename: house , username: useruid } }}>
                        <OtherHousesIcon />
                    </IconButton>
                    <IconButton style={{color: 'white'}} onClick = {getName} >
                        <PlaylistAddCheckCircleIcon />
                    </IconButton>
                    <IconButton style={{color: 'white'}} component={RouterLink} to={{ pathname: "/profile", state: { username: useruid } }}>
                        <PersonIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className='Todo'>
                {/* <Button onClick={getToDo}> Name </Button> */}
                <Button onClick={getToDo}> ToDo List </Button>
                <Typography sx={{ fontSize: 35, fontWeight: 600 }}>
                    Todo List
                </Typography>

                <Typography>
                    Dummy House Name
                </Typography>
            </div>

            {/* {todoList.map((todo) =>  )} */}
            <div className='housemate'>
                <Typography sx={{ fontSize: 23 }}>{userToDo}</Typography>
                {todoList.map((todo) => 
                <FormGroup>
                    <FormControlLabel control={<Checkbox/>} label={todo} key={todo} />
                    {/* <FormControlLabel control={<Checkbox/>} label="Todo Item #2" /> */}
                </FormGroup>

                )}
                
                
            </div>

            
        </div>

    );
}
export default ToDoList2