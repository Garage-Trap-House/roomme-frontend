import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Modal, Box, Grid, Avatar, TextField, Link, Card, CardMedia, CardActionArea, Stack, Checkbox, FormControlLabel, FormGroup, IconButton } from '@mui/material'
import logo from '../assets/images/Room.me Logo White Crop.png';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import PersonIcon from '@mui/icons-material/Person';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [taskName, setTaskName] = useState('')
    const [assigned, setAssignedName] = useState('')
    var choreChecked
    var todoName

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

    function checkName(){
        Axios.post('http://roomme-backend.uc.r.appspot.com/getName', {
            useruid: useruid
        }).then((response) => {
            setName(response.data)
        });
        addChores(userName)
    }

    function addChores(userName) {
        Axios.post('http://roomme-backend.uc.r.appspot.com/addChores', {
            housename: house,
            assignedTo: userName,
            task: taskName
        }).then((response) => {
            //houses = response.data
            setToDo(response.data)
            console.log('success')
        });
        setOpen(false)
    }

    function checkName1(todoName){
        Axios.post('http://roomme-backend.uc.r.appspot.com/getName', {
            useruid: useruid
        }).then((response) => {
            setName(response.data)
        });
        deleteChores(todoName, userName)
    }

    function deleteChores(todoName, userName) {
        Axios.post('http://roomme-backend.uc.r.appspot.com/deleteChores', {
            housename: house,
            assignedTo: userName,
            task: todoName
        }).then((response) => {
            setToDo(response.data)
            console.log('success')
        });
    }

    const handleChange = (e, choreChecked) =>{

        console.log(choreChecked)
        todoName = todoList[choreChecked]
        checkName1(todoName)

    }

    function getToDo() {
        Axios.post('http://roomme-backend.uc.r.appspot.com/getChores', {
            housename: house,
            name: userToDo
        }).then((response) => {
            //houses = response.data
            setToDo(response.data)
            console.log(todoList)
        });
    }

    function getName() {
        Axios.post('http://roomme-backend.uc.r.appspot.com/getName', {
            useruid: useruid
        }).then((response) => {
            setName(response.data)
        });
        history.push({ pathname: "/todo", state: { id: 1, username: useruid, todouser: userName, housename: house } })

    }

    return (
        <div>
            <AppBar style={{ background: '#6B9AC4' }} position="fixed">
                <Toolbar display='flex'>
                    <img src={logo} width="125" height="50" flex />
                    <Typography type='Title' color='inherit' style={{ flex: 1 }} />

                    <IconButton style={{ color: 'white' }} component={RouterLink} to={{ pathname: "/houses", state: { id: 1, housename: house, username: useruid } }}>
                        <OtherHousesIcon />
                    </IconButton>
                    <IconButton style={{ color: 'white' }} onClick={getName} >
                        <PlaylistAddCheckCircleIcon />
                    </IconButton>
                    <IconButton style={{color: 'white'}} component={RouterLink} to={{ pathname: "/alerts", state: { id: 1, housename: house , username: useruid } }}>
                            <NotificationsIcon />
                        </IconButton>
                    <IconButton style={{ color: 'white' }} component={RouterLink} to={{ pathname: "/profile", state: { username: useruid } }}>
                        <PersonIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className='Todo'>
                {/* <Button onClick={getToDo}> Name </Button> */}
                <Button onClick={getToDo}> ToDo List </Button>
                <Typography sx={{ fontSize: 50, fontWeight: 600 }}>
                    Todo List
                </Typography>

                <Typography sx={{ fontSize: 45}}>
                    {house}
                </Typography>
            </div>

            {/* {todoList.map((todo) =>  )} */}
            <div className='housemate'>
                <Typography sx={{ fontSize: 30 }}>{userToDo}</Typography>
                {todoList.map((todo, index) =>
                    <FormGroup>
                        {/* onChange={e => handleChange(e)}  , hi(hu = index) */}
                        <FormControlLabel  onChange={e => handleChange(e, choreChecked = index)} control={<Checkbox />} label={todo} key={todo} />
                        {/* <Button style={{ backgroundColor: "#6B9AC4" }} variant='contained' onClick={e => deleteChore(e, choreChecked)}> Submit </Button>  */}
                        
                        {/* <FormControlLabel control={<Checkbox/>} label="Todo Item #2" /> */}
                    </FormGroup>   

                )}

            </div>
            
            <div className='addButton'>
                <Button onClick={handleOpen} variant='contained' style={{background: '#6B9AC4', position: 'fixed', bottom: 16, right: 16,}}>Add Task</Button>
                <Modal open={open} onClose={handleClose}>
                    <Box sx={style}>
                        <Grid align='center'>
                            <h2>Add Task</h2>
                        </Grid>
                        <TextField
                            label='Chore Name'
                            placeholder='Enter Chore Name'
                            margin='normal'
                            fullWidth
                            required
                            onChange={(e) => setTaskName(e.target.value)}
                        />

                        {/* <TextField
                            label='Assigned To'
                            placeholder='Assign To Housemate'
                            margin='normal'
                            fullWidth
                            required
                            onChange={(e) => setAssignedName(e.target.value)}
                        /> */}
                        <Grid align='center'>
                            <Button style={{ backgroundColor: "#6B9AC4" }} variant='contained' onClick={checkName}> Submit </Button>
                        </Grid>

                    </Box>
                </Modal>
            </div>


        </div>

    );
}
export default ToDoList2